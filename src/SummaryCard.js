import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Loading from "./Loading";
import {
  formatMarketCap,
  formatExchange,
  formatCardDate,
  formatTwo,
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
  loading: {
    height: "20rem",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
class SummaryCard extends PureComponent {
  render() {
    if (!this.props.summary) return null;
    const {
      shortName,
      regularMarketPrice,
      regularMarketChangePercent,
      exchangeName,
    } = this.props.priceInfo;
    let {
      marketCap,
      fiftyTwoWeekHigh: yearHigh,
      fiftyTwoWeekLow: yearLow,
      previousClose,
      trailingPE,
      open,
      dayLow,
      dayHigh,
    } = this.props.summary;
    const { classes, ticker } = this.props;

    [open, dayLow, dayHigh] = [
      formatTwo(open),
      formatTwo(dayLow),
      formatTwo(dayHigh),
    ];
    let cap = formatMarketCap(marketCap);
    let exchange = formatExchange(exchangeName);
    let pe = formatTwo(trailingPE);
    let now = formatCardDate();
    let posToday = regularMarketPrice > open;
    if (this.props.chartIsLoading) {
      return (
        <Card className={classes.loading}>
          <Loading />
        </Card>
      );
    }

    return (
      <Card className={classes.SummaryCard}>
        <CardContent>
          <Typography className={classes.company} variant="h4">
            {shortName}
          </Typography>
          <Typography component="p" className={classes.tickerInfo} gutterBottom>
            {`${exchange}:${ticker.toUpperCase()} - ${now}`}
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
                {(regularMarketPrice - open).toFixed(3)}
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
              <span className={classes.category}>Open</span> <span>{open}</span>
            </Typography>
            <Typography className={classes.info} component="div">
              <span className={classes.category}>Prev Close</span>{" "}
              <span>{previousClose}</span>
            </Typography>
            <Typography className={classes.info} component="div">
              <span className={classes.category}>High</span>{" "}
              <span>{dayHigh}</span>
            </Typography>
            <Typography className={classes.info} component="div">
              <span className={classes.category}>Low</span>{" "}
              <span>{dayLow}</span>
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
              <span className={classes.category}>52 Wk Range</span>
              <span>{`${yearLow} - ${yearHigh}`}</span>
            </Typography>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(SummaryCard);
