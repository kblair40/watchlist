import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

// import SummaryContainer from "./SummaryContainer";
import Navbar from "./Navbar";
import { getData, getMovingAverages, DRAWER_WIDTH } from "./helpers";
import { ContactsOutlined } from "@material-ui/icons";

const styles = {
  ScreenContainer: {},
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

  handleMaCheck(e) {
    console.log("handleMaCheck CALLED:\n", e);
    console.log("MA CLICKED:", e.target.value);
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
    // console.log("HANDLE WATCHLIST CLICK");
    // console.log("ticker:", e.target.innerText);
    const ticker = e.target.innerText;
    try {
      let [fifty, twoHundred] = await getMovingAverages(ticker);
      let [priceData, min, max] = await getData(
        ticker.toLowerCase(),
        this.state.timeframe
      );
      this.setState({
        curTicker: ticker,
        data: priceData,
        dataMin: Math.min(min, fifty * 0.9),
        dataMax: Math.max(max, twoHundred * 1.1),
        fiftyPrice: fifty,
        twoHundredPrice: twoHundred,
      });
    } catch (e) {
      console.log("ERROR RETRIEVING FROM HANDLE WATCHLIST CLICK");
      console.log(e);
    }
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
      dataMin: Math.min(min, this.state.fiftyPrice * 0.9),
      dataMax: Math.max(max, this.state.twoHundredPrice * 1.1),
      // dataMax: max,
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
