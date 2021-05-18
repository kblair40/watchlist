import yahooFinance from "yahoo-finance2";
import dayjs from "dayjs";

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

export async function validateTickerInput(ticker) {
  let result = await getData(ticker, "5d");
  console.log("RESULT:", result ? true : false);
  return result ? true : false;
}

export function formatDividend(div) {
  if (div) {
    return (div * 100).toFixed(2) + "%";
  }
  return null;
}

export function formatPE(pe) {
  return pe ? pe.toFixed(2) : null;
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

export async function getData(ticker, timeframe) {
  let toSub = TIMEMAPPING[timeframe];
  let startDate = dayjs().subtract(toSub[1], toSub[0])["$d"];
  let options = { period1: startDate };
  let rawData;
  try {
    rawData = await yahooFinance.historical(ticker, options);
  } catch (error) {
    console.log("ERROR IN GET DATA (helpers.js)");
    rawData = null;
    return rawData;
  }
  // console.log("RAW DATA:", rawData);
  let min = rawData[0].adjClose;
  let max = rawData[0].adjClose;
  let data = [];
  for (let obj of rawData) {
    if (obj.adjClose < min) {
      min = obj.adjClose;
    }
    if (obj.adjClose > max) {
      max = obj.adjClose;
    }
    data.push({
      shortDate: dayjs(obj.date).format("MMM 'YY"),
      longDate: dayjs(obj.date).format("MMM D, 'YY"),
      price: parseFloat(obj.adjClose.toFixed(2)),
    });
  }
  // console.log("getData returning", data);
  return [data, min * 0.9, max * 1.1];
}

export async function getMovingAverages(ticker) {
  try {
    let quoteSum = await yahooFinance.quoteSummary(ticker);
    let fifty = quoteSum.summaryDetail.fiftyDayAverage;
    let twoHundred = quoteSum.summaryDetail.twoHundredDayAverage;
    return [fifty, twoHundred];
  } catch (e) {
    console.log(`ERROR - UNABLE TO RETRIEVE MOVING AVERAGES FOR ${ticker}`);
    return [null, null];
  }
}
