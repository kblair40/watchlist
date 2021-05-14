import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import {
  AreaChart,
  Area,
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
    // width: "100%",
  },
};

class ChartContainer extends Component {
  render() {
    // let { data } = { ...this.props };
    const {
      classes,
      data,
      dataMin,
      dataMax,
      timeframe,
      ticker,
      fiftyIsChecked,
      twoHundredIsChecked,
      fiftyPrice,
      twoHundredPrice,
      navHeight,
    } = this.props;
    let chartHeight = 400 - navHeight;
    // CHECK HERE FOR PRICE DATA.  IF NO PRICE DATA, RENDER ERROR MODAL INSTEAD
    return (
      <div className={classes.ChartContainer}>
        <ResponsiveContainer width="99%" height={350} maxHeight={350}>
          <AreaChart
            data={data}
            margin={{
              top: 15,
              // right: 10,
              bottom: 10,
              // left: 10,
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
            {/* Recharts does not support adding ReferenceLine to legend.  The 2 lines below do not
              appear in the chart, but they do appear in legend */}
            {fiftyIsChecked ? (
              <Area name="50-day moving avg" stroke="red" />
            ) : (
              ""
            )}
            {twoHundredIsChecked ? (
              <Area name="200-day moving avg" stroke="green" />
            ) : (
              ""
            )}
            <Area
              dataKey="price"
              name={ticker.toUpperCase()}
              dot={false}
              activeDot={{ strokeWidth: 0.5, stroke: "blue" }}
              fillOpacity={0.3}
            />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            {/* <Legend /> 
            Replace with card that will display ticker symbol
            */}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default withStyles(styles)(ChartContainer);

// {
/* <LineChart
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
            */
// }
//   {fiftyIsChecked ? (
//     <Line name="50-day moving avg" stroke="red" />
//   ) : (
//     ""
//   )}
//   {twoHundredIsChecked ? (
//     <Line name="200-day moving avg" stroke="green" />
//   ) : (
//     ""
//   )}
//   <Line
//     dataKey="price"
//     name={ticker.toUpperCase()}
//     dot={false}
//     activeDot={{ strokeWidth: 0.5, stroke: "blue" }}
//   />
//   <Tooltip />
//   <CartesianGrid />
//   <Legend />
// </LineChart> */}
