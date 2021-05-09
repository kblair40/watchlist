import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const styles = {
  chartContainer: {},
};

class ChartContainer extends Component {
  render() {
    let { priceData } = { ...this.props };
    const { classes, dataMin, dataMax, timeframe, ticker } = this.props;
    // console.log("priceData:", priceData);
    // CHECK HERE FOR PRICE DATA.  IF NO PRICE DATA, RENDER ERROR MODAL INSTEAD
    return (
      <div className={classes.ChartContainer}>
        <ResponsiveContainer width="100%" height={450} minHeight={300}>
          <LineChart
            data={priceData}
            margin={{
              top: 5,
              right: 15,
              bottom: 10,
              left: 10,
            }}
          >
            <XAxis dataKey="date" />
            {/* <YAxis dataKey="price" type="number" domain={[dataMin, dataMax]} /> */}
            <YAxis domain={[dataMin, dataMax]} />
            <Line dataKey="price" name={ticker.toUpperCase()} />
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
