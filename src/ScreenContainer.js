import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";
import { getData, getMovingAverages, validateTickerInput } from "./helpers";

const TEST_REGEX = /^[a-z]{1,4}$/i;

const styles = {
  ScreenContainer: {
    // backgroundColor: "#253138",
    // color: "#fff",
  },
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
      isValidInput: true,
      openSnackbar: false,
    };
    this.handleTimeframeChange = this.handleTimeframeChange.bind(this);
    this.handleTickerChange = this.handleTickerChange.bind(this);
    this.handleWatchlistClick = this.handleWatchlistClick.bind(this);
    this.addTicker = this.addTicker.bind(this);
    this.deleteTicker = this.deleteTicker.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.handleMaCheck = this.handleMaCheck.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
  }

  clearInput() {
    let input = document.getElementById("newTickerInput");
    input.value = "";
  }

  handleMaCheck(e) {
    e.stopPropagation();
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

  handleInputBlur() {
    this.setState({ isValidInput: true });
  }

  handleInputFocus(e) {
    let isValidInput = TEST_REGEX.test(e.target.value);
    this.setState({ isValidInput: isValidInput });
  }

  async addTicker(e) {
    e.preventDefault();
    this.clearInput();
    const newTicker = this.state.tickerInput.toLowerCase();
    const valResult = await validateTickerInput(newTicker);
    if (!this.state.userTickers.includes(newTicker) && valResult) {
      // PUT THIS IN SETTIMEOUT?
      // MIGHT NEED TO SET openSnackbar BACK TO FALSE
      this.setState({
        userTickers: [...this.state.userTickers, newTicker],
        openSnackbar: true,
      });
      setTimeout(() => {
        this.setState({ openSnackbar: false });
      }, 3000);
    } else {
      console.log("FAILURE IN addTicker - ScreenContainer");
      console.log(`Unable to add ${newTicker}`);
      // RENDER SNACKBAR WITH ERROR HERE
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
      isValidInput,
      openSnackbar,
    } = this.state;
    // let mostRecentTickerAdded = userTickers[userTickers.length - 1];
    // console.log("MOST RECENT: ", mostRecentTickerAdded);
    const { classes } = this.props;
    return (
      <div className={classes.ScreenContainer}>
        <div className={classes.navbar}>
          <Navbar
            data={data}
            openSnackbar={openSnackbar}
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
            isValidInput={isValidInput}
            handleInputBlur={this.handleInputBlur}
            handleInputFocus={this.handleInputFocus}
            // mostRecentTickerAdded={mostRecentTickerAdded}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ScreenContainer);
