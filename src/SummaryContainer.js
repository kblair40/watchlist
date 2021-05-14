import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import DataItem from "./DataItem";
import { months, formatBillions } from "./helpers";
// import SummaryCard from "./SummaryCard";

import yahooFinance from "yahoo-finance2";

const styles = {
  SummaryContainer: {
    // "@media screen and (max-width: 620px)": {
    // },
  },
};

class SummaryContainer extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     marketCap: null,
  //     shortName: null,
  //     regularMarketPreviousClose: null,
  //     trailingPE: null,
  //     regularMarketOpen: null,
  //     regularMarketDayLow: null,
  //     regularMarketDayHigh: null,
  //     regularMarketPrice: null,
  //     trailingAnnualDividendYield: null,
  //     regularMarketChangePercent: null,
  //   };
  }

  async updateData() {
    // console.log("RECEIVED:");
    // console.log(this.props);
    // let response = await yahooFinance.quote(this.props.ticker);
    // console.log("response:", response);
    // this.setState({
    //   marketCap: response.marketCap,
    //   shortName: response.shortName,
    //   regularMarketPreviousClose: response.regularMarketPreviousClose,
    //   trailingPE: response.trailingPE,
    //   regularMarketOpen: response.regularMarketOpen,
    //   regularMarketDayLow: response.regularMarketDayLow,
    //   regularMarketDayHigh: response.regularMarketDayHigh,
    //   regularMarketPrice: response.regularMarketPrice,
    //   trailingAnnualDividendYield: response.trailingAnnualDividendYield,
    //   regularMarketChangePercent: response.regularMarketChangePercent,
    // });
  }

  // componentDidUpdate() {
  //   this.updateData();
  // }

  // async componentDidMount() {
  componentDidMount() {
    // this.updateData();
    // console.log("RECEIVED:");
    // console.log(this.props);
    // let response = await yahooFinance.quote(this.props.ticker);
    // console.log("response:", response);
    // this.setState({
    //   marketCap: response.marketCap,
    //   shortName: response.shortName,
    //   regularMarketPreviousClose: response.regularMarketPreviousClose,
    //   trailingPE: response.trailingPE,
    //   regularMarketOpen: response.regularMarketOpen,
    //   regularMarketDayLow: response.regularMarketDayLow,
    //   regularMarketDayHigh: response.regularMarketDayHigh,
    //   regularMarketPrice: response.regularMarketPrice,
    //   trailingAnnualDividendYield: response.trailingAnnualDividendYield,
    //   regularMarketChangePercent: response.regularMarketChangePercent,
    // });
  }
  render() {
    let {
      regularMarketPreviousClose,
      trailingPE,
      regularMarketOpen,
      regularMarketDayLow,
      regularMarketDayHigh,
      regularMarketPrice,
      trailingAnnualDividendYield,
      regularMarketChangePercent,
      marketCap,
      shortName,
    } = this.state;
    const { classes, ticker } = this.props;
    return (
      <div className={classes.SummaryContainer}>
        {/* <SummaryCard
          ticker={ticker}
          marketCap={marketCap}
          shortName={shortName}
          regularMarketPreviousClose={regularMarketPreviousClose}
          trailingPE={trailingPE}
          regularMarketOpen={regularMarketOpen}
          regularMarketDayLow={regularMarketDayLow}
          regularMarketDayHigh={regularMarketDayHigh}
          regularMarketPrice={regularMarketPrice}
          trailingAnnualDividendYield={trailingAnnualDividendYield}
          regularMarketChangePercent={regularMarketChangePercent}
        /> */}
      </div>
    );
  }
}
export default withStyles(styles)(SummaryContainer);

//{/* <SummaryCard
//          ticker={ticker}
//          marketCap={marketCap}
//          shortName={shortName}
//          regularMarketPreviousClose={regularMarketPreviousClose}
//          trailingPE={trailingPE}
//          regularMarketOpen={regularMarketOpen}
//          regularMarketDayLow={regularMarketDayLow}
//          regularMarketDayHigh={regularMarketDayHigh}
//          regularMarketPrice={regularMarketPrice}
//          trailingAnnualDividendYield={trailingAnnualDividendYield}
//          regularMarketChangePercent={regularMarketChangePercent}
//        /> */}
