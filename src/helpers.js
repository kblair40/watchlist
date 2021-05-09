import yahooFinance from "yahoo-finance2";
import dayjs from "dayjs";

// 1d, 10d, 1m, 3m, 6m, 1y, 3y, 5y
const TIMEMAPPING = {
  "5d": ["day", 5],
  "10d": ["day", 10],
  "1m": ["month", 1],
  "3m": ["month", 3],
  "6m": ["month", 6],
  "1y": ["year", 1],
  "3y": ["year", 3],
  "5y": ["year", 5],
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export async function getData(ticker, timeframe) {
  let toSub = TIMEMAPPING[timeframe];
  let startDate = dayjs().subtract(toSub[1], toSub[0])["$d"];
  let options = { period1: startDate };
  let rawData;
  try {
    rawData = await yahooFinance.historical(ticker, options);
  } catch (error) {
    rawData = null;
    return rawData;
  }
  let min = rawData[0].adjClose;
  let max = rawData[0].adjClose;
  let data = [];
  for (let obj of rawData) {
    if (obj.adjClose < min) min = obj.adjClose;
    if (obj.adjClose > max) max = obj.adjClose;
    data.push({
      date: `${months[obj.date.getMonth()]}-${obj.date.getDate()}`,
      price: parseFloat(obj.adjClose.toFixed(2)),
    });
  }
  return [data, min * 0.9, max * 1.1];
}

async function validateTicker(ticker, options) {}
