import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import WatchlistItem from "./WatchlistItem";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

const styles = {
  Watchlist: {
    display: "flex",
    flexDirection: "column",
  },
  tickerInput: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    margin: ".8rem 0 0 0",
    textAlign: "center",
  },
  stockList: {
    overflowY: "auto",
    direction: "rtl",
    padding: ".5rem",
    maxHeight: "18rem",
    display: "grid",
    gridTemplateRows: "repeat(auto-fill, 4.2rem)",
  },
  submitBtn: {
    margin: "0.3rem 0",
    width: "50%",
    minWidth: "80px",
  },
  newTickerLabel: {
    color: "#000",
  },
  singleStock: {},
};

class Watchlist extends Component {
  render() {
    const {
      classes,
      handleTickerChange,
      handleWatchlistClick,
      addTicker,
      userTickers,
      deleteTicker,
    } = this.props;
    return (
      <List className={classes.Watchlist}>
        <form className={classes.tickerInput}>
          <InputLabel
            className={classes.newTickerLabel}
            component="legend"
            htmlFor="tickerInput"
          >
            Add Ticker
          </InputLabel>
          <Input
            autoComplete="off"
            placeholder="ex. aapl"
            id="tickerInput"
            onChange={handleTickerChange}
          >
            Ticker
          </Input>
          <Button
            type="submit"
            className={classes.submitBtn}
            onClick={addTicker}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </form>
        <h2 className={classes.title}>WATCHLIST</h2>
        <div className={classes.stockList}>
          {userTickers.map((ticker) => (
            <WatchlistItem
              className={classes.singleStock}
              key={ticker}
              ticker={ticker}
              handleClick={handleWatchlistClick}
              deleteTicker={deleteTicker}
            />
          ))}
        </div>
      </List>
    );
  }
}

export default withStyles(styles)(Watchlist);
