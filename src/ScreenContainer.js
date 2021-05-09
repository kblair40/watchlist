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

  async addTicker(e) {
    const newTicker = this.state.tickerInput.toLowerCase();
    const isValid = await this.plotData(e, newTicker);
    if (isValid && !this.state.userTickers.includes(newTicker)) {
      this.setState({
        userTickers: [...this.state.userTickers, newTicker],
      });
    }

    // this.plotData(e, this.state.tickerInput);
  }
  async plotData(e, ticker) {
    e.preventDefault();
    let data = await getData(this.state.tickerInput, this.state.timeframe);
    let priceData, min, max;
    if (data) {
      [priceData, min, max] = data;
    } else {
      return false;
    }
    this.setState({
      data: priceData,
      dataMin: min,
      dataMax: max,
    });
    return true;
  }

  render() {
    const { data, dataMin, dataMax, userTickers, timeframe } = this.state;
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
