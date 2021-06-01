import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";
import { getData, getMovingAverages, validateTickerInput } from "./helpers";
import { TEST_REGEX } from "./helpers";

const styles = {};

class ScreenContainer extends Component {
  constructor(props) {
    super(props);
    const savedTickers = JSON.parse(window.localStorage.getItem("tickers"));
    this.state = {
      tickerInput: "",
      timeframe: "5d",
      data: {},
      dataMin: 0,
      dataMax: 0,
      curTicker: "aapl",
      userTickers: savedTickers || ["aapl", "spy"],
      fiftyPrice: 0,
      fiftyIsChecked: false,
      twoHundredPrice: 0,
      twoHundredIsChecked: false,
      isValidInput: true,
      openSnackbar: false,
      addTickerSuccess: false,
      errorTicker: "",
      summary: undefined,
      chartIsLoading: true,
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

  async addTicker(e) {
    e.preventDefault();
    this.clearInput();
    const newTicker = this.state.tickerInput.toLowerCase();
    const valResult = await validateTickerInput(newTicker);
    if (!this.state.userTickers.includes(newTicker) && valResult) {
      this.openSnackbar(newTicker, true);
    } else {
      console.log("FAILURE IN addTicker - ScreenContainer");
      console.log(`Unable to add ${newTicker}`);
      this.openSnackbar(newTicker, false);
    }
  }

  deleteTicker(e, ticker) {
    e.stopPropagation();
    this.setState(
      {
        userTickers: this.state.userTickers.filter((tick) => tick !== ticker),
      },
      this.syncLocalStorage
    );
  }

  syncLocalStorage() {
    // Save tickers in user's watchlist to local storage
    window.localStorage.setItem(
      "tickers",
      JSON.stringify(this.state.userTickers)
    );
  }

  componentDidMount() {
    let ticker = this.state.userTickers[0];
    this.setData(ticker, this.state.timeframe);
  }

  clearInput() {
    let input = document.getElementById("new-ticker-input");
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
    this.setData(this.state.curTicker, e.target.value);
  }

  async setData(ticker, timeframe = this.state.timeframe) {
    this.setState({ chartIsLoading: true });
    let replacementState = {};
    try {
      let [fifty, twoHundred] = await getMovingAverages(ticker);
      let [prices, min, max, summary, priceInfo] = await getData(
        ticker.toLowerCase(),
        timeframe
      );

      replacementState = {
        curTicker: ticker,
        fiftyPrice: fifty,
        twoHundredPrice: twoHundred,
        data: prices,
        dataMin: Math.min(min, fifty * 0.9),
        dataMax: Math.max(max, twoHundred * 1.1),
        timeframe: timeframe,
        summary: summary,
        priceInfo: priceInfo,
        chartIsLoading: false,
      };
    } catch (e) {
      console.log("ERROR IN SET DATA:", `\n${e}`);
      return;
    }
    this.setState({ ...replacementState });
  }

  handleTickerChange(e) {
    let isValidInput = TEST_REGEX.test(e.target.value);
    this.setState({
      isValidInput: isValidInput,
      tickerInput: e.target.value,
    });
  }

  handleInputBlur() {
    this.setState({ isValidInput: true });
  }

  handleInputFocus(e) {
    let isValidInput = TEST_REGEX.test(e.target.value);
    this.setState({ isValidInput: isValidInput });
  }

  openSnackbar(ticker, success) {
    let newTickers = success
      ? [...this.state.userTickers, ticker]
      : [...this.state.userTickers];
    this.setState(
      {
        userTickers: newTickers,
        openSnackbar: true,
        addTickerSuccess: success,
        errorTicker: ticker,
        tickerInput: "",
      },
      this.syncLocalStorage
    );
    setTimeout(() => {
      this.setState({ openSnackbar: false });
    }, 3000);
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
      addTickerSuccess,
      errorTicker,
      summary,
      priceInfo,
      chartIsLoading,
    } = this.state;
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
            addTickerSuccess={addTickerSuccess}
            errorTicker={errorTicker}
            summary={summary}
            priceInfo={priceInfo}
            chartIsLoading={chartIsLoading}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ScreenContainer);
