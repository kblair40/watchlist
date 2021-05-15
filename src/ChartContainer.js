import { withStyles } from "@material-ui/core/styles";
import CustomTooltip from "./CustomTooltip";
import React, { Component } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const styles = {
  ChartContainer: {
    position: "relative",
    right: "10px",
  },
};

class ChartContainer extends Component {
  render() {
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
      // navHeight,
    } = this.props;
    // let chartHeight = 400 - navHeight;
    let longTimeframe = ["5d", "10d", "1m"].includes(timeframe);
    return (
      <div className={classes.ChartContainer}>
        <ResponsiveContainer width="99%" height={350} maxHeight={350}>
          <AreaChart
            data={data}
            margin={{
              top: 15,
              bottom: 15,
            }}
          >
            <XAxis
              angle={5}
              interval="preserveEnd"
              minTickGap={15}
              dataKey={longTimeframe ? "longDate" : "shortDate"}
              tickMargin={10}
            />
            <YAxis dataKey="price" domain={[dataMin, dataMax]} />
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
            <Tooltip
              content={<CustomTooltip />}
              // wrapperStyle={{ backgroundColor: "#fff" }}
            />
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
