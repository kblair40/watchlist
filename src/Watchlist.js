import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import WatchlistItem from "./WatchlistItem";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

const styles = {
  Watchlist: {
    // width: "100%",
    // minWidth: "140px",
    // maxWidth: "200px",
  },
  title: {
    textAlign: "center",
    marginTop: "3rem",
  },
  tickerInput: {
    marginBottom: "0rem",
    display: "flex",
    flexDirection: "column",
  },
  stockList: {
    overflow: "scroll",
    maxHeight: "20rem",
  },
  submitBtn: {
    margin: "0.3rem 0",
    alignSelf: "center",
    width: "50%",
    minWidth: "80px",
  },
  newTickerLabel: {
    color: "#000",
  },
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
      <div className={classes.watchlist}>
        <List>
          <form className={classes.tickerInput}>
            <InputLabel
              className={classes.newTickerLabel}
              component="legend"
              htmlFor="tickerInput"
            >
              Add Ticker
            </InputLabel>
            <Input
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
          <Divider />
          <h2 className={classes.title}>WATCHLIST</h2>
          <div className={classes.stockList}>
            {userTickers.map((ticker) => (
              <WatchlistItem
                key={ticker}
                ticker={ticker}
                handleClick={handleWatchlistClick}
                deleteTicker={deleteTicker}
              />
            ))}
          </div>
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(Watchlist);

// const styles = {
//   Watchlist: {},
//   title: {
//     textAlign: "center",
//     marginTop: "3rem",
//   },
//   tickerInput: {
//     marginBottom: "0rem",
//     display: "flex",
//     flexDirection: "column",
//   },
//   stockList: {
//     overflow: "scroll",
//     maxHeight: "20rem",
//   },
//   submitBtn: {
//     margin: "0.3rem 0",
//     alignSelf: "center",
//     width: "50%",
//     minWidth: "80px",
//   },
//   newTickerLabel: {
//     color: "#000",
//   },
// };
