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
    const { classes, dataMin, dataMax } = this.props;
    return (
      <div className={classes.ChartContainer}>
        <ResponsiveContainer width="100%" height={450} minHeight={300}>
          <LineChart
            data={priceData}
            margin={{
              top: 5,
              right: 15,
              bottom: 10,
              left: 5,
            }}
          >
            <XAxis dataKey="date" padding={{ left: 5, right: 5, top: 5 }} />
            <YAxis dataKey="price" type="number" domain={[dataMin, dataMax]} />
            <Line dataKey="price" />
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
