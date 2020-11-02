const puppeteer = require("puppeteer");

// get the client
const mysql = require("mysql2");
const config = require("./config.json");

// create the connection to database
const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});
module.exports = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://dorm.chungbuk.ac.kr/home/sub.php?menukey=20041&type=3"
  );
  var data = await page.evaluate(() => {
    getData: function getData() {
      let data = [];
      const foodList = document.querySelector("table").querySelectorAll("tr");
      for (let i = 1; i < foodList.length; i++) {
        let timeList = foodList[i].querySelectorAll("td");
        for (let j = 1; j < timeList.length; j++) {
          data.push({
            restaurant_name: "양진재",
            food_name: timeList[j].innerText,
            day: timeList[0].innerText[0],
            date: timeList[0].innerText.split("\n")[1],
            time: j % 4,
          });
        }
      }
      return data;
    }
    return getData();
  });
  data.map((d) => {
    const query = connection.query("INSERT INTO restaurant SET ?", d, function (
      err,
      result
    ) {
      console.log(result);
    });
  });
  await browser.close();
};
