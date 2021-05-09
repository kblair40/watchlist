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
    margin: "1rem 0",
  },
};

class ScreenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickerInput: "aapl",
      timeframe: "5d",
      data: undefined,
      dataMin: 0,
      dataMax: 0,
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
    // console.log("e:", e);
    // console.log("ticker:", ticker);
    // console.log("parents");
    // console.log(e.target.parentElement);
    // console.log(e.target.parentElement.parentElement.innerText);
    e.stopPropagation();
    console.log("e:", e);
    console.log("DELETING", ticker);
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
      tickerInput: ticker,
      data: priceData,
      dataMin: min,
      dataMax: max,
    });
  }

  handleTimeframeChange(e) {
    this.setState({ timeframe: e.target.value });
  }
  handleTickerChange(e) {
    this.setState({ tickerInput: e.target.value });
  }

  addTicker(e) {
    this.setState({
      userTickers: [...this.state.userTickers, this.state.tickerInput],
    });
    this.plotData(e, this.state.tickerInput);
  }
  async plotData(e, ticker) {
    e.preventDefault();
    let [priceData, min, max] = await getData(
      this.state.tickerInput,
      this.state.timeframe
    );
    console.log("RECEIVED:", min, max, typeof min, typeof max);
    this.setState({
      data: priceData,
      dataMin: min,
      dataMax: max,
    });
  }
  render() {
    const { tickerInput, data, dataMin, dataMax, userTickers } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.ScreenContainer}>
        <SetTimeframe
          plotData={this.plotData}
          handleTimeframeChange={this.handleTimeframeChange}
          ticker={this.state.tickerInput}
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
            dataMin={parseFloat(dataMin.toFixed(2))}
            dataMax={parseFloat(dataMax.toFixed(2))}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ScreenContainer);
