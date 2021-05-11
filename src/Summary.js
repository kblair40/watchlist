import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import DataItem from "./DataItem";

import yahooFinance from "yahoo-finance2";

const styles = {
  Summary: {
    // justifySelf: "start",
    // border: "1px solid orange",
    minWidth: "550px",
  },
  data: {
    color: "red",
    fontWeight: "700",
    float: "right",
  },
  companyName: {
    textAlign: "center",
    lineHeight: ".5rem",
  },
};

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fiftyTwoWeekHigh: null,
      fiftyTwoWeekLow: null,
      fiftyTwoWeekRange: null,
      averageDailyVolume10Day: null,
      marketCap: null,
      shortName: null,
      regularMarketPreviousClose: null,
      trailingPE: null,
    };
  }
  async componentDidMount() {
    console.log("RECEIVED:");
    console.log(this.props);
    let response = await yahooFinance.quote(this.props.ticker);
    console.log("response:", response);
    this.setState({
      fiftyTwoWeekHigh: response.fiftyTwoWeekHigh,
      fiftyTwoWeekLow: response.fiftyTwoWeekLow,
      fiftyTwoWeekRange: response.fiftyTwoWeekRange,
      averageDailyVolume10Day: response.averageDailyVolume10Day,
      marketCap: response.marketCap,
      shortName: response.shortName,
      regularMarketPreviousClose: response.regularMarketPreviousClose,
      trailingPE: response.trailingPE,
    });
  }
  render() {
    const { classes } = this.props;
    return (
      // <div>
      <div className={classes.Summary}>
        <h3 className={classes.companyName}>{this.state.shortName}</h3>

        <DataItem category="shortName" data={this.state.shortName} />
        <DataItem
          category="fiftyTwoWeekHigh"
          data={this.state.fiftyTwoWeekHigh}
        />

        <DataItem
          category="fiftyTwoWeekLow"
          data={this.state.fiftyTwoWeekLow}
        />
        <DataItem
          category="averageDailyVolume10Day"
          data={this.state.averageDailyVolume10Day}
        />
        <DataItem category="marketCap" data={this.state.marketCap} />
        <DataItem
          category="regularMarketPreviousClose"
          data={this.state.regularMarketPreviousClose}
        />
        <DataItem category="trailingPE" data={this.state.trailingPE} />
      </div>
      //{/* </div> */}
    );
  }
}
export default withStyles(styles)(Summary);
