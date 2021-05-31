const express = require("express");
const yf = require("yahoo-finance");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("HOME");
});

app.get("/:ticker", async (req, res) => {
  let queryReceived = true;
  if (Object.keys(req.query).length > 0) {
    console.log("QUERY RECEIVED:", req.query);
    // [to, from] = formatQuery([req.query.to, req.query.from]);
    query = { to: req.query.to, from: req.query.from };
    console.log(query);
  } else {
    console.log("NO QUERY RECEIVED");
    queryReceived = false;
  }

  const ticker = req.params.ticker;
  console.log("ticker:", ticker);
  const prices = await yf.historical({
    symbol: ticker,
    from: queryReceived ? query.from : null,
    to: queryReceived ? query.to : null,
  });
  let data = { isValid: prices.length > 0 };
  if (!data["isValid"]) {
    console.log("EARLY RETURN");
    res.send(data);
  }
  data["prices"] = prices;
  const quoteSum = await yf.quote(ticker);
  data["summary"] = quoteSum.summaryDetail;
  let movingAverages = {
    50: quoteSum.summaryDetail.fiftyDayAverage,
    200: quoteSum.summaryDetail.twoHundredDayAverage,
  };
  movingAverages = modifyMa(movingAverages);
  data["movingAverages"] = { ...movingAverages };
  console.log("DATA:", data);
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

function formatQuery(query) {
  console.log("query:", query);
  return query;
}
