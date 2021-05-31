const express = require("express");
const yf = require("yahoo-finance");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("HOME");
});

// app.get("/:ticker", async (req, res) => {
//   const ticker = req.params.ticker;
//   console.log("ticker:", ticker);
//   const prices = await yf.historical({
//     symbol: ticker,
//     from: "2021-05-22",
//     to: "2021-05-28",
//   });
//   res.send(prices);
// });

app.get("/:ticker", async (req, res) => {
  let data = {};
  const ticker = req.params.ticker;
  console.log("ticker:", ticker);
  const prices = await yf.historical({
    symbol: ticker,
    from: "2021-05-22",
    to: "2021-05-28",
  });
  data["isValid"] = prices.length > 0;
  console.log("VALID ?", data["isValid"]);
  console.log("PRICES:", prices);
  if (!data["isValid"]) {
    console.log("EARLY RETURN");
    res.send(data);
  }
  const quoteSum = await yf.quote(ticker);
  console.log("quoteSum.summaryDetail:", quoteSum.summaryDetail);
  const movingAverages = {
    50: quoteSum.summaryDetail.fiftyDayAverage,
    200: quoteSum.summaryDetail.twoHundredDayAverage,
  };
  console.log("MOVING AVERAGES BEFORE:", movingAverages);
  if (movingAverages["50"] > movingAverages["200"]) {
    movingAverages["50"] *= 1.1;
    movingAverages["200"] *= 0.9;
  } else {
    movingAverages["200"] *= 1.1;
    movingAverages["50"] *= 0.9;
  }
  data["movingAverages"] = { ...movingAverages };
  console.log("DATA:", data);
  //   res.send(movingAverages);
  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
