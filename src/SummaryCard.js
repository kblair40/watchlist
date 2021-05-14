import React, { Component, PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import yahooFinance from "yahoo-finance2";
import classNames from "classnames";
import {
  formatMarketCap,
  formatExchange,
  formatCardDate,
  formatPE,
  formatDividend,
  POSITIVE,
  NEGATIVE,
} from "./helpers";

const styles = {
  SummaryCard: {
    minWidth: 275,
    // display: "flex",
    // flexDirection: "column",
    // overflowY: "auto",
    // zIndex: 30,
    // height: "100%",
    // minHeight: "150px",
  },
  curInfo: {
    alignItems: "baseline",
    display: "flex",
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
  },
  neg: {
    color: NEGATIVE,
  },
  pos: {
    color: POSITIVE,
  },
  curPrice: {
    fontWeight: "700",
    fontSize: "1.8rem",
  },
};
class SummaryCard extends PureComponent {
  constructor(props) {
    // console.log("LOGGING PROPS:", props);
    super(props);
    this.state = {
      ticker: null,
      marketCap: null,
      shortName: null,
      regularMarketPreviousClose: null,
      trailingPE: null,
      regularMarketOpen: null,
      regularMarketDayLow: null,
      regularMarketDayHigh: null,
      regularMarketPrice: null,
      trailingAnnualDividendYield: null,
      regularMarketChangePercent: null,
      fullExchangeName: null,
    };
  }
  async componentDidUpdate() {
    let response = await yahooFinance.quote(this.props.ticker);
    console.log("response:", response);
    this.setState({
      marketCap: response.marketCap,
      shortName: response.shortName,
      regularMarketPreviousClose: response.regularMarketPreviousClose,
      trailingPE: response.trailingPE,
      regularMarketOpen: response.regularMarketOpen,
      regularMarketDayLow: response.regularMarketDayLow,
      regularMarketDayHigh: response.regularMarketDayHigh,
      regularMarketPrice: response.regularMarketPrice,
      trailingAnnualDividendYield: response.trailingAnnualDividendYield,
      regularMarketChangePercent: response.regularMarketChangePercent,
      fullExchangeName: response.fullExchangeName,
      ticker: this.props.ticker,
    });
  }
  async componentDidMount() {
    console.log("RECEIVED:");
    console.log(this.props);
    let response = await yahooFinance.quote(this.props.ticker);
    console.log("response:", response);
    this.setState({
      marketCap: response.marketCap,
      shortName: response.shortName,
      regularMarketPreviousClose: response.regularMarketPreviousClose,
      trailingPE: response.trailingPE,
      regularMarketOpen: response.regularMarketOpen,
      regularMarketDayLow: response.regularMarketDayLow,
      regularMarketDayHigh: response.regularMarketDayHigh,
      regularMarketPrice: response.regularMarketPrice,
      trailingAnnualDividendYield: response.trailingAnnualDividendYield,
      regularMarketChangePercent: response.regularMarketChangePercent,
      fullExchangeName: response.fullExchangeName,
      ticker: this.props.ticker,
    });
  }

  render() {
    const {
      marketCap,
      shortName,
      regularMarketPreviousClose,
      trailingPE,
      regularMarketOpen,
      regularMarketDayLow,
      regularMarketDayHigh,
      regularMarketPrice,
      trailingAnnualDividendYield,
      regularMarketChangePercent,
      fullExchangeName,
    } = this.state;
    const { classes, ticker } = this.props;
    let cap = formatMarketCap(marketCap);
    let exchangeName = formatExchange(fullExchangeName);
    let pe = formatPE(trailingPE);
    let div = formatDividend(trailingAnnualDividendYield);
    let now = formatCardDate();
    let posToday = regularMarketPrice > regularMarketOpen;
    return (
      <Card className={classes.SummaryCard}>
        <CardContent>
          <Typography variant="h5">{shortName}</Typography>
          <Typography component="p" gutterBottom>
            {`${exchangeName}:${ticker.toUpperCase()} - ${now}`}
          </Typography>
          <Typography component="p" gutterBottom>
            {posToday ? (
              <span className={classes.curInfo}>
                <span className={classes.curPrice}>{regularMarketPrice}</span>
                &nbsp;
                <ArrowUpward className={classes.pos} />
                &nbsp;
                <span className={classes.pos}>
                  {(regularMarketPrice - regularMarketOpen).toFixed(3)}
                </span>
                &nbsp;
                <span className={classes.pos}>
                  ({regularMarketChangePercent.toFixed(3)}%)
                </span>
              </span>
            ) : (
              <span className={classes.curInfo}>
                <span className={classes.curPrice}>{regularMarketPrice}</span>
                &nbsp;
                <ArrowDownward className={classes.neg} />
                &nbsp;
                <span className={classes.neg}>
                  {(regularMarketPrice - regularMarketOpen).toFixed(3)}
                </span>
                &nbsp;
                <span className={classes.neg}>
                  {/* ({regularMarketChangePercent.toFixed(3)}%)( */}(
                  {regularMarketChangePercent}%)
                </span>
              </span>
            )}
          </Typography>
          <div className={classes.infoContainer}>
            <Typography className={classes.info} component="div">
              <span>Open</span> <span>{regularMarketOpen}</span>
            </Typography>
            <Typography className={classes.info} component="div">
              <span>Prev Close</span> <span>{regularMarketPreviousClose}</span>
            </Typography>
            <Typography className={classes.info} component="div">
              <span>High</span> <span>{regularMarketDayHigh}</span>
            </Typography>
            <Typography className={classes.info} component="div">
              <span>Low</span> <span>{regularMarketDayLow}</span>
            </Typography>
            <Typography className={classes.info} component="div">
              <span>Market Cap</span> <span>{cap}</span>
            </Typography>
            <Typography className={classes.info} component="div">
              <span>P/E ratio</span> <span>{pe ? pe : "n/a"}</span>
            </Typography>
            <Typography className={classes.info} component="div">
              <span>Dividend yield </span>
              <span>{div ? div : "n/a"}</span>
            </Typography>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(SummaryCard);
