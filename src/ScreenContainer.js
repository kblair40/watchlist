import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
// import SummaryContainer from "./SummaryContainer";
import Navbar from "./Navbar";
import {
  getData,
  getMovingAverages,
  validateTickerInput,
  DRAWER_WIDTH,
} from "./helpers";
import { ContactsOutlined } from "@material-ui/icons";

const TEST_REGEX = /^[a-z]{1,4}$/i;

const styles = {
  ScreenContainer: {},
};

class ScreenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickerInput: "",
      timeframe: "5d",
      data: {},
      dataMin: 0,
      dataMax: 0,
      curTicker: "aapl",
      userTickers: ["aapl", "ibm", "dal", "upwk"],
      fiftyPrice: 0,
      fiftyIsChecked: false,
      twoHundredPrice: 0,
      twoHundredIsChecked: false,
      isValidInput: false,
    };
    this.handleTimeframeChange = this.handleTimeframeChange.bind(this);
    this.handleTickerChange = this.handleTickerChange.bind(this);
    this.handleWatchlistClick = this.handleWatchlistClick.bind(this);
    this.addTicker = this.addTicker.bind(this);
    this.deleteTicker = this.deleteTicker.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.handleMaCheck = this.handleMaCheck.bind(this);
  }

  clearInput() {
    let input = document.getElementById("newTickerInput");
    input.value = "";
  }

  // [
  //   handleMaCheck,
  //   deleteTicker, OK I THINK
  //   (a)handleWatchlistClick, OK I THINK
  //   (a)handleTimeframeChange, OK I THINK
  //   handleTickerChange, OK I THINK
  //   addTicker, OK I THINK
  //   (a)plotData, DELETED THIS
  // ]

  handleMaCheck(e) {
    // console.log("handleMaCheck CALLED:\n", e);
    // console.log("MA CLICKED:", e.target.value);
    e.stopPropagation();
    const { fiftyChecked, twoHundredChecked } = this.state;
    let maClicked = e.target.value;

    if (Array.isArray(maClicked)) {
      if (maClicked.includes("50") && maClicked.includes("200")) {
        this.setState({ fiftyIsChecked: true, twoHundredIsChecked: true });
      } else if (maClicked.includes("50")) {
        this.setState({ fiftyIsChecked: true, twoHundredIsChecked: false });
      } else if (maClicked.includes("200")) {
        this.setState({ fiftyIsChecked: false, twoHundredIsChecked: true });
      } else {
        this.setState({ fiftyIsChecked: false, twoHundredIsChecked: false });
      }
      return;
    } else {
      if (maClicked === "50") {
        this.setState({ fiftyIsChecked: !this.state.fiftyIsChecked });
      } else {
        this.setState({ twoHundredIsChecked: !this.state.twoHundredIsChecked });
      }
    }
  }

  async handleWatchlistClick(e) {
    const ticker = e.target.innerText;
    this.setData(ticker, this.state.timeframe);
  }

  async handleTimeframeChange(e) {
    // THIS IS SETTING STATE CORRECTLY.  NOT SURE IF IT TRIGGERS RE-RENDER
    console.log("CHANGE TIMEFRAME TO", e.target.value);
    this.setData(this.state.curTicker, e.target.value);
  }

  // async setData(ticker, timeRange) {
  async setData(ticker, timeframe = this.state.timeframe) {
    // if timeframe if passed as argument to timeRange, timeRange will be used.
    //    Otherwise, current timeframe in state will be used.
    let replacementState = {};
    try {
      let [fifty, twoHundred] = await getMovingAverages(ticker);
      let [prices, min, max] = await getData(ticker.toLowerCase(), timeframe);

      replacementState = {
        curTicker: ticker,
        fiftyPrice: fifty,
        twoHundredPrice: twoHundred,
        data: prices,
        dataMin: Math.min(min, fifty * 0.9),
        dataMax: Math.max(max, twoHundred * 1.1),
        timeframe: timeframe,
      };
    } catch (e) {
      console.log("ERROR IN SET DATA:", `\n${e}`);
      return;
    }

    console.log("replacementState:", replacementState);
    this.setState({ ...replacementState });
  }

  handleTickerChange(e) {
    let isValidInput = TEST_REGEX.test(e.target.value);
    this.setState({ isValidInput: isValidInput, tickerInput: e.target.value });
  }

  async addTicker(e) {
    e.preventDefault();
    this.clearInput();
    const newTicker = this.state.tickerInput.toLowerCase();
    const valResult = await validateTickerInput(newTicker);
    if (!this.state.userTickers.includes(newTicker) && valResult) {
      this.setState({
        userTickers: [...this.state.userTickers, newTicker],
      });
    } else {
      console.log("FAILURE IN addTicker - ScreenContainer");
      console.log(`Unable to add ${newTicker}`);
    }
  }

  deleteTicker(e, ticker) {
    e.stopPropagation();
    this.setState({
      userTickers: this.state.userTickers.filter((tick) => tick !== ticker),
    });
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
      tickerInput,
    } = this.state;
    const { classes } = this.props;
    // console.log('SCREEN CONTAINER DATA:', data)
    return (
      <div className={classes.ScreenContainer}>
        <div className={classes.navbar}>
          <Navbar
            data={data}
            tickerInput={tickerInput}
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

// async handleWatchlistClick(e) {
//   // console.log("HANDLE WATCHLIST CLICK");
//   // console.log("ticker:", e.target.innerText);
//   const ticker = e.target.innerText;
//   try {
//     let [fifty, twoHundred] = await getMovingAverages(ticker);
//     let [priceData, min, max] = await getData(
//       ticker.toLowerCase(),
//       this.state.timeframe
//     );
//     this.setState({
//       curTicker: ticker,
//       data: priceData,
//       dataMin: Math.min(min, fifty * 0.9),
//       dataMax: Math.max(max, twoHundred * 1.1),
//       fiftyPrice: fifty,
//       twoHundredPrice: twoHundred,
//     });
//   } catch (e) {
//     console.log("ERROR RETRIEVING FROM HANDLE WATCHLIST CLICK");
//     // console.log(e);
//   }
// }
