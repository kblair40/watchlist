import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import MovingAverageContainer from "./MovingAverageContainer";
import MovingAverageSelect from "./MovingAverageSelect";
import SetTimeframe from "./SetTimeframe";
import TimeframeSelect from "./TimeframeSelect";

const styles = {
  ChartOptions: {
    display: "flex",
    // justifyContent: "space-around",
    justifyContent: "space-evenly",
    minWidth: "280px",
  },
  maOptions: {
    marginRight: "1.5rem",
  },
  timeframeOptions: {
    // marginLeft: 20,
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
    return (
      <div className={classes.ChartOptions}>
        <div className={classes.maOptions}>
          {appBarWidth > 1100 ? (
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
          {appBarWidth > 1100 ? (
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
