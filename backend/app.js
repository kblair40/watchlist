const express = require("express");
const cors = require("cors");
const yf = require("yahoo-finance");
const app = express();
const port = 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("HOME");
});

app.get("/:ticker", async (req, res) => {
  let queryReceived = true;
  if (Object.keys(req.query).length > 0) {
    query = { to: req.query.to, from: req.query.from };
  } else {
    queryReceived = false;
  }

  const ticker = req.params.ticker;
  const prices = await yf.historical({
    symbol: ticker,
    from: queryReceived ? query.from : null,
    to: queryReceived ? query.to : null,
  });
  let data = { isValid: prices.length > 0 };
  if (!data["isValid"]) {
    res.send(data);
  }
  data["prices"] = prices;
  const quoteSum = await yf.quote(ticker, ["summaryDetail", "price"]);
  data["summary"] = quoteSum.summaryDetail;
  data["priceInfo"] = quoteSum.price;
  let movingAverages = {
    50: quoteSum.summaryDetail.fiftyDayAverage,
    200: quoteSum.summaryDetail.twoHundredDayAverage,
  };
  movingAverages = modifyMa(movingAverages);
  data["movingAverages"] = { ...movingAverages };
  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
function modifyMa(movingAverages) {
  if (movingAverages["50"] > movingAverages["200"]) {
    movingAverages["50"] *= 1.1;
    movingAverages["200"] *= 0.9;
  } else {
    movingAverages["200"] *= 1.1;
    movingAverages["50"] *= 0.9;
  }
  return movingAverages;
}

// function formatQuery(query) {
//   console.log("query:", query);
//   return query;
// }
