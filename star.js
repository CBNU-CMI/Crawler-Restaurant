const puppeteer = require("puppeteer");

const starGetData = require("./star.script");

// get the client
const mysql = require("mysql2");
const config = require("./config.json");
const getData = require("./star.script");

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
  await page.goto("http://coop.cbnu.ac.kr/index.php?mid=m0302");

  await page.evaluate(starGetData.toString());
  var data = await page.evaluate(() => {
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
