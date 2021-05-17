import { withStyles } from "@material-ui/core/styles";
import CustomTooltip from "./CustomTooltip";
import React, { Component } from "react";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import { NUM_OF_DAYS } from "./helpers";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  // Legend,
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

const renderLegend = (props) => {
  let legendContainer = {
    border: "1px solid red",
    display: "flex",
    justifyContent: "flex-end",
  };

  return (
    <div style={legendContainer}>
      <div>
        <span>Trending</span>
        <span>
          {props.posReturn ? (
            <ArrowUpward style={{ color: "#48c15e" }} />
          ) : (
            <ArrowDownward style={{ color: "#ef6670" }} />
          )}
        </span>
      </div>
      <div>
        <span>Annualized RoR&nbsp; </span>
        {props.posReturn ? (
          <span style={{ color: "#48c15e" }}> {props.ror}%</span>
        ) : (
          <span style={{ color: "#ef6670" }}> {props.ror}%</span>
        )}
      </div>
    </div>
  );
};

class ChartContainer extends Component {
  isGain(data) {
    if (data[0]) {
      let startPrice = data[0].price;
      let endPrice = data[data.length - 1].price;
      console.log("isGain ?", endPrice > startPrice);
      console.log("ROR:", ((endPrice - startPrice) / startPrice).toFixed(2));
      let rorAdj = NUM_OF_DAYS[this.props.timeframe] / 365;
      let ror = ((endPrice - startPrice) / startPrice) * 100;
      ror = (ror * rorAdj).toFixed(2);
      return [endPrice > startPrice, ror];
    }
    return [false, null];
  }
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
      height,
    } = this.props;
    console.log("HEIGHT:", height);
    // let chartHeight = 400 - height;
    let longTimeframe = ["5d", "10d", "1m", "6m"].includes(timeframe);
    let leftMargin = dataMax >= 1000 ? 15 : dataMax >= 100 ? 5 : 0;
    let [posReturn, ror] = this.isGain(data);
    return (
      <div className={classes.ChartContainer}>
        <ResponsiveContainer width="99%" height={350} maxHeight={350}>
          <AreaChart
            data={data}
            margin={{
              top: 15,
              bottom: 15,
              left: leftMargin,
            }}
            posReturn={posReturn}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={posReturn ? "#48c15e" : "#ef6670"}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={posReturn ? "#48c15e" : "#ef6670"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              axisLine={{ stroke: "rgba(0,0,0,.4)" }}
              tickLine={{ stroke: "rgba(0,0,0,.3)" }}
              // allowDuplicatedCategory={false}
              interval="preserveEnd"
              minTickGap={25}
              dataKey={longTimeframe ? "longDate" : "shortDate"}
              tickMargin={10}
            />
            <YAxis
              axisLine={{ stroke: "rgba(0,0,0,.4)" }}
              tickLine={{ stroke: "rgba(0,0,0,.3)" }}
              dataKey="price"
              domain={[dataMin, dataMax]}
            />
            {fiftyIsChecked ? (
              <ReferenceLine
                y={fiftyPrice}
                name="50-Day Moving Average"
                stroke="rgba(0,0,0,.4)"
                label={{ position: "top", value: "50" }}
                strokeDasharray=" 3"
              />
            ) : (
              ""
            )}
            {twoHundredIsChecked ? (
              <ReferenceLine
                y={twoHundredPrice}
                name="200-Day Moving Average"
                stroke="rgba(0,0,0,.4)"
                label={{ position: "top", value: "200" }}
                strokeDasharray=" 3"
              />
            ) : (
              ""
            )}

            <Area
              dataKey="price"
              name={ticker.toUpperCase()}
              dot={false}
              stroke={posReturn ? "#48c15e" : "#ef6670"}
              activeDot={{ strokeWidth: 0.5 }}
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Tooltip content={<CustomTooltip />} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default withStyles(styles)(ChartContainer);
