import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import { getMovingAverages } from "./helpers";
import MovingAverageContainer from "./MovingAverageContainer";
import MovingAverageSelect from "./MovingAverageSelect";
import SetTimeframe from "./SetTimeframe";
import TimeframeSelect from "./TimeframeSelect";

const styles = {
  ChartOptions: {
    display: "flex",
    justifyContent: "space-evenly",
  },
};

class ChartOptions extends Component {
  render() {
    const {
      handleMaCheck,
      classes,
      plotData,
      fiftyIsChecked,
      twoHundredIsChecked,
      handleTimeframeChange,
      timeframe,
      ticker,
      appBarWidth,
    } = this.props;
    console.log("appBarWidth:", appBarWidth);
    return (
      <div className={classes.ChartOptions}>
        <div className={classes.maOptions}>
          {appBarWidth > 600 ? (
            <MovingAverageContainer
              handleMaCheck={handleMaCheck}
              fiftyIsChecked={fiftyIsChecked}
              twoHundredIsChecked={twoHundredIsChecked}
            />
          ) : (
            <MovingAverageSelect
              handleMaCheck={handleMaCheck}
              fiftyIsChecked={fiftyIsChecked}
              twoHundredIsChecked={twoHundredIsChecked}
            />
          )}
        </div>
        <div className={classes.timeframeOptions}>
          {appBarWidth > 1000 ? (
            <SetTimeframe
              ticker={ticker}
              plotData={plotData}
              handleTimeframeChange={handleTimeframeChange}
              timeframe={timeframe}
            />
          ) : (
            <TimeframeSelect
              ticker={ticker}
              plotData={plotData}
              handleTimeframeChange={handleTimeframeChange}
              timeframe={timeframe}
            />
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ChartOptions);
