import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

// import SummaryContainer from "./SummaryContainer";
import Navbar from "./Navbar";
// import ChartContainer from "./ChartContainer";
// import MovingAverageContainer from "./MovingAverageContainer";
// import SetTimeframe from "./SetTimeframe";
import { getData, getMovingAverages, DRAWER_WIDTH } from "./helpers";

const styles = {
  ScreenContainer: {
    // display: "grid",
    // gridTemplateAreas: `
    //                     'dr ab ab'
    //                     `,
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
      fiftyPrice: null,
      fiftyIsChecked: false,
      twoHundredPrice: null,
      twoHundredIsChecked: false,
    };
    this.handleTimeframeChange = this.handleTimeframeChange.bind(this);
    this.handleTickerChange = this.handleTickerChange.bind(this);
    this.plotData = this.plotData.bind(this);
    this.handleWatchlistClick = this.handleWatchlistClick.bind(this);
    this.addTicker = this.addTicker.bind(this);
    this.deleteTicker = this.deleteTicker.bind(this);
    this.handleMaCheck = this.handleMaCheck.bind(this);
  }

  async setMovingAverages(ticker = null) {
    let [fifty, twoHundred] = await getMovingAverages(this.state.curTicker);
    console.log("MA:", [fifty, twoHundred]);
    this.setState({ fiftyPrice: fifty, twoHundredPrice: twoHundred });
  }
  async componentDidMount() {
    this.setMovingAverages();
  }

  handleMaCheck(e) {
    console.log("handleMaCheck CALLED:\n", e);
    console.log("value?:", e.target.value);
    const { fiftyChecked, twoHundredChecked } = this.state;
    let maClicked = e.target.value;
    if (maClicked === "50") {
      this.setState({ fiftyIsChecked: !this.state.fiftyIsChecked });
    } else {
      this.setState({ twoHundredIsChecked: !this.state.twoHundredIsChecked });
    }
  }

  deleteTicker(e, ticker) {
    console.log("DELETE");
    console.log("Event:", e);
    console.log("Ticker:", ticker);
    e.stopPropagation();
    this.setState({
      userTickers: this.state.userTickers.filter((tick) => tick !== ticker),
    });
  }

  async handleWatchlistClick(e) {
    const ticker = e.target.innerText;
    let [fifty, twoHundred] = await getMovingAverages(ticker);
    let [priceData, min, max] = await getData(
      ticker.toLowerCase(),
      this.state.timeframe
    );
    this.setState({
      curTicker: ticker,
      data: priceData,
      dataMin: min,
      dataMax: max,
      fiftyPrice: fifty,
      twoHundredPrice: twoHundred,
    });
  }

  async handleTimeframeChange(e) {
    this.setState({ timeframe: e.target.value });
    const isValid = await this.plotData(
      e,
      this.state.curTicker,
      e.target.value
    );
  }

  handleTickerChange(e) {
    this.setState({ tickerInput: e.target.value });
  }

  async addTicker(e) {
    console.log("ADD TICKER CALLED");
    const newTicker = this.state.tickerInput.toLowerCase();
    const isValid = await this.plotData(e, newTicker);
    let [fifty, twoHundred] = await getMovingAverages(newTicker);
    if (isValid && !this.state.userTickers.includes(newTicker)) {
      this.setState({
        userTickers: [...this.state.userTickers, newTicker],
        curTicker: this.state.tickerInput,
        fiftyPrice: fifty,
        twoHundredPrice: twoHundred,
      });
    }
  }

  async plotData(e, ticker, timeframe) {
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
    const {
      data,
      dataMin,
      dataMax,
      userTickers,
      timeframe,
      curTicker,
      fiftyIsChecked,
      twoHundredIsChecked,
      fiftyPrice,
      twoHundredPrice,
    } = this.state;
    const { classes } = this.props;
    // console.log('SCREEN CONTAINER DATA:', data)
    return (
      <div className={classes.ScreenContainer}>
        <div className={classes.navbar}>
          <Navbar
            data={data}
            handleTimeframeChange={this.handleTimeframeChange}
            handleMaCheck={this.handleMaCheck}
            plotData={this.plotData}
            addTicker={this.addTicker}
            handleTickerChange={this.handleTickerChange}
            handleWatchlistClick={this.handleWatchlistClick}
            userTickers={userTickers}
            deleteTicker={this.deleteTicker}
            ticker={curTicker}
            fiftyIsChecked={fiftyIsChecked}
            twoHundredIsChecked={twoHundredIsChecked}
            fiftyPrice={fiftyPrice}
            twoHundredPrice={twoHundredPrice}
            dataMin={data ? parseFloat(dataMin.toFixed(2)) : null}
            dataMax={data ? parseFloat(dataMax.toFixed(2)) : null}
            timeframe={timeframe}
          />
        </div>
        {/* <div className={classes.watchlist}>
          <Watchlist />
        </div>
        <div className={classes.summaryAndOptions}>
           <div className={classes.chartOptions}>
            <h3 className={classes.chartOptionsLabel}>Chart Options</h3>
            <SetTimeframe
              plotData={this.plotData}
              handleTimeframeChange={this.handleTimeframeChange}
              ticker={curTicker}
            />
            <MovingAverageContainer
              ticker={curTicker}
              handleCheck={this.handleMaCheck}
              fiftyIsChecked={fiftyIsChecked}
              twoHundredIsChecked={twoHundredIsChecked}
            />
          </div> */}
        {/* <div className={classes.chartOptions}>
          <h3 className={classes.chartOptionsLabel}>Chart Options</h3>
          <SetTimeframe
            plotData={this.plotData}
            handleTimeframeChange={this.handleTimeframeChange}
            ticker={curTicker}
          />
          <MovingAverageContainer
            ticker={curTicker}
            handleCheck={this.handleMaCheck}
            fiftyIsChecked={fiftyIsChecked}
            twoHundredIsChecked={twoHundredIsChecked}
          />
        </div> */}
      </div>
      // </div>
    );
  }
}

export default withStyles(styles)(ScreenContainer);

// const styles = {
//   ScreenContainer: {
//     height: "100vh",
//     padding: "1rem",
//   },
//   watchlistAndChart: {
//     display: "grid",
//     gridTemplateColumns: "20% 80%",
//     // "@media screen and (max-width: 750px)": {
//     //   gridTemplateColumns: "100%",
//     //   gridTemplateRows: "13% 87%",
//     // },
//   },
//   divider: {
//     margin: ".5rem 0",
//   },
//   movingAverage: {
//     display: "flex",
//     justifyContent: "center",
//   },
// };
