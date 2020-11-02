const { setInterval } = require("timers");
const bon = require("./bon");
const milkyway = require("./milkyway");
const star = require("./star");
const yangjin = require("./yangjin");
const yangseong = require("./yangseong");

const crawling = async () => {
  await bon();
  await milkyway();
  await star();
  await yangjin();
  await yangseong();
};

crawling();

const second = 1000;
const minute = second * 60;
const hour = minute * 60;

setInterval(crawling, 12 * hour);
