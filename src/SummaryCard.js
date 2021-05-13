import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { formatCardDate, POSITIVE, NEGATIVE } from "./helpers";

const styles = {
  card: {
    minWidth: 275,
    height: "100%",
    overflow: "scroll",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
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
class SummaryCard extends Component {
  render() {
    const {
      classes,
      ticker,
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
    } = this.props;

    let now = formatCardDate();
    let posToday = regularMarketPrice > regularMarketOpen;
    console.log("posToday:", posToday);
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5">{shortName}</Typography>
          <Typography component="p" gutterBottom>
            {`NYSE:${ticker.toUpperCase()} - ${now}`}
          </Typography>
          <Typography component="p" gutterBottom>
            <span className={classes.curPrice}>{regularMarketPrice}</span>
            {posToday ? (
              <span>
                <ArrowUpward className={classes.pos} />
                <span className={classes.pos}>
                  {(regularMarketPrice - regularMarketOpen).toFixed(3)}
                </span>
                <span className={classes.pos}>
                  ({regularMarketChangePercent.toFixed(3)}%)
                </span>
              </span>
            ) : (
              <span>
                <ArrowDownward className={classes.neg} />
                <span className={classes.neg}>
                  {(regularMarketPrice - regularMarketOpen).toFixed(3)}
                </span>
                <span className={classes.neg}>
                  {/* ({regularMarketChangePercent.toFixed(3)}%) */}(
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
              <span>Market Cap</span> <span>{marketCap}</span>
            </Typography>
            <Typography className={classes.info} component="div">
              <span>P/E ratio</span> <span>{trailingPE}</span>
            </Typography>
            <Typography className={classes.info} component="div">
              <span>Dividend yield </span>
              <span>{trailingAnnualDividendYield}</span>
            </Typography>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(SummaryCard);
