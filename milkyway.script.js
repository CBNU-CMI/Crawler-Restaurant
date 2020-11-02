function getData() {
  function getStartDate() {
    return new Date(
      document
        .querySelector(
          `#sub_right > div:nth-child(3) > div > p:nth-child(2) > span > sup > span > b`
        )
        .innerText.split("~")[0]
        .replace(/[\(년월일]/g, "")
        .trim()
        .replace(/[\ \ ]/g, ".")
    );
  }

  function getFoodList() {
    const nodelist = document.querySelectorAll(
      "#sub_right > div:nth-child(4) > div > div > table > tbody > tr:nth-child(2) > td"
    );

    const foodlist = [...nodelist];
    return foodlist.splice(2, 6).map((food) => food.innerText);
  }

  const twoDigit = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  const dateFormat = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${twoDigit(d.getMonth() + 1)}-${twoDigit(
      d.getDate()
    )}`;
  };

  const foodList = getFoodList();
  const startDate = getStartDate();
  const week = ["월", "화", "수", "목", "금"];
  let data = [];
  for (let i = 0; i < foodList.length; i++) {
    data.push({
      restaurant_name: "은하수식당",
      food_name: foodList[i],
      day: week[i],
      date: dateFormat(
        new Date(startDate.setDate(startDate.getDate() + (i ? 1 : 0)))
      ),
      time: 2,
    });
  }
  return data;
}

module.exports = getData;
