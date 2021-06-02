import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import yahooFinance from "yahoo-finance2";
import {
  formatMarketCap,
  formatExchange,
  formatCardDate,
  formatPE,
  formatDividend,
} from "./helpers";

const styles = {
  SummaryCard: {
    minWidth: 275,
    width: "100%",
    maxWidth: 600,
  },
  curInfo: {
    alignItems: "baseline",
    display: "flex",
    fontWeight: 500,
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    color: "#4d5964",
  },
  neg: {
    color: "#ef6670",
  },
  pos: {
    color: "#48c15e",
  },
  curPrice: {
    color: "#000714",
    fontWeight: 500,
    fontSize: "1.8rem",
  },
  category: {
    color: "#000714",
  },
  company: {
    color: "#000714",
    fontWeight: 500,
  },
  tickerInfo: {
    color: "#4d5964",
  },
};
class SummaryCard extends PureComponent {
  constructor(props) {
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
    this.getCardData();
  }
  async componentDidMount() {
    this.getCardData();
  }

  async getCardData() {
    let response = await yahooFinance.quote(this.props.ticker);
    if (response) {
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
    } else {
      console.log(
        `FAILED IN summaryCard - UNABLE TO RETRIEVE DATA FOR ${this.props.ticker}`
      );
    }
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
          <Typography className={classes.company} variant="h4">
            {shortName}
          </Typography>
          <Typography component="p" className={classes.tickerInfo} gutterBottom>
            {`${exchangeName}:${ticker.toUpperCase()} - ${now}`}
          </Typography>
          <Typography component="p" gutterBottom>
            <span className={classes.curInfo}>
              <span className={classes.curPrice}>{regularMarketPrice}</span>
              &nbsp;
              {posToday ? (
                <ArrowUpward className={classes.pos} />
              ) : (
                <ArrowDownward className={classes.neg} />
              )}
              &nbsp;
              <span className={posToday ? classes.pos : classes.neg}>
                {(regularMarketPrice - regularMarketOpen).toFixed(3)}
              </span>
              &nbsp;
              <span className={posToday ? classes.pos : classes.neg}>
                (
                {regularMarketChangePercent
                  ? regularMarketChangePercent.toFixed(3)
                  : "n/a"}
                %)
              </span>
            </span>
          </Typography>
          <div className={classes.infoContainer}>
            <Typography className={classes.info} component="div">
              <span className={classes.category}>Open</span>{" "}
              <span>{regularMarketOpen}</span>
            </Typography>
            <Typography className={classes.info} component="div">
              <span className={classes.category}>Prev Close</span>{" "}
              <span>{regularMarketPreviousClose}</span>
            </Typography>
            <Typography className={classes.info} component="div">
              <span className={classes.category}>High</span>{" "}
              <span>{regularMarketDayHigh}</span>
            </Typography>
            <Typography className={classes.info} component="div">
              <span className={classes.category}>Low</span>{" "}
              <span>{regularMarketDayLow}</span>
            </Typography>
            <Typography className={classes.info} component="div">
              <span className={classes.category}>Market Cap</span>{" "}
              <span>{cap}</span>
            </Typography>
            <Typography className={classes.info} component="div">
              <span className={classes.category}>P/E ratio</span>{" "}
              <span>{pe ? pe : "n/a"}</span>
            </Typography>
            <Typography className={classes.info} component="div">
              <span className={classes.category}>Dividend yield </span>
              <span>{div ? div : "n/a"}</span>
            </Typography>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(SummaryCard);
