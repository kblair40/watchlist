import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const styles = {
  ChartContainer: {
    // minWidth: "100%",
    // padding: "1rem",
    // width: "100%",
  },
};

class ChartContainer extends Component {
  render() {
    let { priceData } = { ...this.props };
    const {
      classes,
      dataMin,
      dataMax,
      timeframe,
      ticker,
      fiftyIsChecked,
      twoHundredIsChecked,
      fiftyPrice,
      twoHundredPrice,
    } = this.props;
    // console.log("priceData:", priceData);
    // CHECK HERE FOR PRICE DATA.  IF NO PRICE DATA, RENDER ERROR MODAL INSTEAD
    return (
      <div className={classes.ChartContainer}>
        <ResponsiveContainer
          width="100%" // height="100%" // height={450}
          // height={450}
          // minHeight={400}
          // minWidth={500}
          // minWidth="80%"
        >
          <LineChart
            data={priceData}
            margin={{
              top: 30,
              right: 15,
              bottom: 10,
              left: 20,
            }}
          >
            <XAxis dataKey="date" />
            <YAxis domain={[dataMin, dataMax]} />
            {fiftyIsChecked ? (
              <ReferenceLine
                y={fiftyPrice}
                name="50-Day Moving Average"
                stroke="red"
              />
            ) : (
              ""
            )}
            {twoHundredIsChecked ? (
              <ReferenceLine
                y={twoHundredPrice}
                name="200-Day Moving Average"
                stroke="green"
              />
            ) : (
              ""
            )}
            {/* 
            Recharts does not support adding ReferenceLine to legend.  The 2 lines below do not
              appear in the chart, but they do appear in legend
            */}
            {fiftyIsChecked ? (
              <Line name="50-day moving avg" stroke="red" />
            ) : (
              ""
            )}
            {twoHundredIsChecked ? (
              <Line name="200-day moving avg" stroke="green" />
            ) : (
              ""
            )}
            <Line
              dataKey="price"
              name={ticker.toUpperCase()}
              dot={false}
              activeDot={{ strokeWidth: 0.5, stroke: "blue" }}
            />
            <Tooltip />
            <CartesianGrid />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default withStyles(styles)(ChartContainer);

// const styles = {
//   chartContainer: {},
// };
