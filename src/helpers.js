// import yahooFinance from "yahoo-finance2";
import dayjs from "dayjs";
import axios from "axios";

// 1d, 10d, 1m, 3m, 6m, 1y, 3y, 5y
export const DRAWER_WIDTH = 240;

export const POSITIVE = "#48c15e";
export const NEGATIVE = "#ef6670";

export const TEST_REGEX = /^[a-z]{1,4}$/i;

export const NUM_OF_DAYS = {
  "5d": 5,
  "10d": 10,
  "1m": 30,
  "3m": 92,
  "6m": 183,
  "1y": 365,
  "3y": 1095,
  "5y": 1825,
};

export async function validateTickerInput(ticker) {
  let result = await axios.get(`http://localhost:5000/${ticker}`);
  // let result = await getData(ticker, "5d");
  console.log("RESULT:", result);
  // console.log("LENGTH:", result);
  return result.data.isValid; //result.data.length ? true : false;
}

export function formatTwo(num) {
  return num ? num.toFixed(2) : null;
}

export function formatMarketCap(marketCap) {
  if (marketCap < 1000000000) {
    // less than $1B
    return `${(marketCap / 1000000).toFixed(1)}M`;
  } else if (marketCap < 1000000000000) {
    // less than $1T
    return `${(marketCap / 1000000000).toFixed(1)}B`;
  } else {
    // Any amount greater than $1T
    return `${(marketCap / 1000000000000).toFixed(1)}T`;
  }
}

export function formatExchange(exchange) {
  const exchangeFormatter = {
    NasdaqGS: "Nasdaq",
  };
  return exchange in exchangeFormatter ? exchangeFormatter[exchange] : exchange;
}
export const exchangeFormatter = {
  NasdaqGS: "Nasdaq",
};

export function formatBillions(number) {
  return (number / 1000000000).toFixed(1) + "B";
}

export const months = [
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

export function formatCardDate() {
  let datetimeString = dayjs().format("MMM DD h:mm");
  let tz = timezones[dayjs().format("ZZ")];
  datetimeString += ` ${tz}`;
  return datetimeString;
}

let timezones = {
  "-0500": "CST",
  "-0600": "EST",
  "-0400": "MT",
  "-0300": "PST",
};

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

export async function getData(ticker, timeframe) {
  let toSub = TIMEMAPPING[timeframe];
  let from = dayjs().subtract(toSub[1], toSub[0])["$d"];
  let to = dayjs()["$d"];
  let dataUrl = `http://localhost:5000/${ticker}?from=${from}&to=${to}`;
  let data = await axios.get(dataUrl);
  data = data.data;
  const { prices, summary, priceInfo } = data;
  let chartData = [];
  let min = Infinity,
    max = -Infinity;
  for (let obj of prices) {
    chartData.push({
      shortDate: dayjs(obj.date).format("MMM 'YY"),
      longDate: dayjs(obj.date).format("MMM D, 'YY"),
      price: parseFloat(obj.adjClose.toFixed(2)),
    });
    if (obj.adjClose < min) {
      min = obj.adjClose;
    }
    if (obj.adjClose > max) {
      max = obj.adjClose;
    }
  }

  return [chartData.reverse(), min * 0.9, max * 1.1, summary, priceInfo];
}

export async function getMovingAverages(ticker) {
  try {
    let movingAvg = await axios.get(`http://localhost:5000/${ticker}`);
    let fifty = movingAvg.data.movingAverages["50"];
    let twoHundred = movingAvg.data.movingAverages["200"];
    return [fifty, twoHundred];
  } catch (e) {
    console.log(`ERROR - UNABLE TO RETRIEVE MOVING AVERAGES FOR ${ticker}`);
    console.log("E:", e);
    return [null, null];
  }
}
