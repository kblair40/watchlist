import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

import ChartContainer from "./ChartContainer";
import SetTimeframe from "./SetTimeframe";
import Watchlist from "./Watchlist";
import { getData } from "./helpers";

const styles = {
  ScreenContainer: {
    height: "100vh",
    padding: "1rem",
  },
  watchlistAndChart: {
    display: "grid",
    gridTemplateColumns: "20% 80%",
    // "@media screen and (max-width: 750px)": {
    //   gridTemplateColumns: "100%",
    //   gridTemplateRows: "13% 87%",
    // },
  },
  divider: {
    margin: ".5rem 0",
  },
};

class ScreenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickerInput: "",
      timeframe: "5d",
      data: undefined,
      dataMin: 0,
      dataMax: 0,
      curTicker: "aapl",
      userTickers: ["aapl", "ibm", "dal", "upwk"],
    };
    this.handleTimeframeChange = this.handleTimeframeChange.bind(this);
    this.handleTickerChange = this.handleTickerChange.bind(this);
    this.plotData = this.plotData.bind(this);
    this.handleWatchlistClick = this.handleWatchlistClick.bind(this);
    this.addTicker = this.addTicker.bind(this);
    this.deleteTicker = this.deleteTicker.bind(this);
  }

  deleteTicker(e, ticker) {
    e.stopPropagation();
    this.setState({
      userTickers: this.state.userTickers.filter((tick) => tick !== ticker),
    });
  }

  async handleWatchlistClick(e) {
    const ticker = e.target.innerText;
    let [priceData, min, max] = await getData(
      ticker.toLowerCase(),
      this.state.timeframe
    );
    this.setState({
      curTicker: ticker,
      data: priceData,
      dataMin: min,
      dataMax: max,
    });
  }

  async handleTimeframeChange(e) {
    console.log("SETTING TIMEFRAME TO", e.target.value);

    this.setState({ timeframe: e.target.value });
    const isValid = await this.plotData(
      e,
      this.state.curTicker,
      e.target.value
    );
    console.log("IS VALID:", isValid);
    // await this.plotData(e, this.state.curTicker, true);
  }
  handleTickerChange(e) {
    this.setState({ tickerInput: e.target.value });
  }

  async addTicker(e) {
    const newTicker = this.state.tickerInput.toLowerCase();
    const isValid = await this.plotData(e, newTicker);
    if (isValid && !this.state.userTickers.includes(newTicker)) {
      this.setState({
        userTickers: [...this.state.userTickers, newTicker],
        curTicker: this.state.tickerInput,
      });
    }

    // this.plotData(e, this.state.tickerInput);
  }
  async plotData(e, ticker, timeframe) {
    console.log("INSIDE PLOT DATA:");
    console.log("ticker:", ticker);
    console.log("e:", e);
    console.log("timeframe:", timeframe, typeof timeframe);
    e.preventDefault();

    let data;
    // checks if timeframe was passed as argument.  If it was (if), ticker would've been provided
    //  as an argument.  If it was not (else), either a new ticker was added or a ticker on the
    //  watchlist was selected and ticker/timeframe must be retrieved from state.
    if (timeframe) {
      data = await getData(ticker, timeframe);
    } else {
      data = await getData(this.state.tickerInput, this.state.timeframe);
    }
    let priceData, min, max;
    console.log("DATA:", data);
    if (data) {
      [priceData, min, max] = data;
    } else {
      return false;
    }
    this.setState({
      // curTicker: this.state.tickerInput,
      data: priceData,
      dataMin: min,
      dataMax: max,
    });
    return true;
  }

  render() {
    const {
      tickerInput,
      data,
      dataMin,
      dataMax,
      userTickers,
      timeframe,
      curTicker,
    } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.ScreenContainer}>
        <SetTimeframe
          plotData={this.plotData}
          handleTimeframeChange={this.handleTimeframeChange}
          // ticker={tickerInput}
          ticker={curTicker}
        />
        <Divider variant="middle" className={classes.divider} />
        <div className={classes.watchlistAndChart}>
          <Watchlist
            plotData={this.plotData}
            addTicker={this.addTicker}
            handleTickerChange={this.handleTickerChange}
            handleWatchlistClick={this.handleWatchlistClick}
            userTickers={userTickers}
            deleteTicker={this.deleteTicker}
          />
          <ChartContainer
            priceData={data}
            // ticker={tickerInput}
            ticker={curTicker}
            dataMin={data ? parseFloat(dataMin.toFixed(2)) : null}
            dataMax={data ? parseFloat(dataMax.toFixed(2)) : null}
            timeframe={timeframe}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ScreenContainer);
