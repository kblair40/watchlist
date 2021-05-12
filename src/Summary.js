import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import DataItem from "./DataItem";
import { months, formatBillions } from "./helpers";

import yahooFinance from "yahoo-finance2";

const styles = {
  Summary: {
    "@media screen and (max-width: 620px)": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "1rem",
    },
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
  positive: {
    color: "green",
  },
  negative: {
    color: "red",
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
      epsTrailingTwelveMonths: null,
      regularMarketOpen: null,
      regularMarketDayLow: null,
      regularMarketDayHigh: null,
      regularMarketPrice: null,
      sharesOutstanding: null,
      dividendDate: null,
      trailingAnnualDividendYield: null,
      averageAnalystRating: null,
      regularMarketChangePercent: null,
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
      epsTrailingTwelveMonths: response.epsTrailingTwelveMonths,
      regularMarketOpen: response.regularMarketOpen,
      regularMarketDayLow: response.regularMarketDayLow,
      regularMarketDayHigh: response.regularMarketDayHigh,
      regularMarketPrice: response.regularMarketPrice,
      sharesOutstanding: response.sharesOutstanding,
      dividendDate: Date(response.dividendDate),
      trailingAnnualDividendYield: response.trailingAnnualDividendYield,
      averageAnalystRating: response.averageAnalystRating,
      regularMarketChangePercent: response.regularMarketChangePercent,
    });
  }
  render() {
    let { dividendDate, regularMarketPrice, regularMarketChangePercent } =
      this.state;
    dividendDate = new Date(dividendDate);
    dividendDate = `${
      months[dividendDate.getMonth()]
    }, ${dividendDate.getDay()}`;

    const { classes } = this.props;
    return (
      <div className={classes.Summary}>
        <span
          className={
            regularMarketChangePercent > 0 ? classes.positive : classes.negative
          }
        >
          {regularMarketPrice} {regularMarketChangePercent}
        </span>
        {/* <span> {regularMarketChangePercent} </span> */}
        <h3 className={classes.companyName}>{this.state.shortName}</h3>
        <DataItem
          category="Previous Close"
          data={this.state.regularMarketPreviousClose}
        />
        <DataItem category="EPS" data={this.state.epsTrailingTwelveMonths} />
        <DataItem category="Today's Open" data={this.state.regularMarketOpen} />
        <DataItem category="P/E Ratio" data={this.state.trailingPE} />
        <DataItem category="52-Wk High" data={this.state.fiftyTwoWeekHigh} />

        <DataItem
          category="averageDailyVolume10Day"
          data={this.state.averageDailyVolume10Day}
        />
        <DataItem category="52-Wk Low" data={this.state.fiftyTwoWeekLow} />
        <DataItem
          category="Market Cap"
          data={formatBillions(this.state.marketCap)}
        />
        <DataItem
          category="Today's Low"
          data={this.state.regularMarketDayLow}
        />
        <DataItem
          category="Today's High"
          data={this.state.regularMarketDayHigh}
        />
        <DataItem
          category="Shares Outstanding"
          data={this.state.sharesOutstanding}
        />
        <DataItem category="Ex-dividend Date" data={dividendDate} />
        <DataItem
          category="Annual Dividend Yield"
          data={this.state.trailingAnnualDividendYield}
        />
        <DataItem
          category="Avg. Analyst Rating"
          data={this.state.averageAnalystRating}
        />
      </div>
    );
  }
}
export default withStyles(styles)(Summary);
