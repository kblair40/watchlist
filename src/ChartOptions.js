import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { getMovingAverages } from "./helpers";
import MovingAverageContainer from "./MovingAverageContainer";
import SetTimeframe from "./SetTimeframe";

const styles = {
  optionsContainer: {
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "flex-start",
    // justifyContent: "flex-start",
  },
  ChartOptions: {
    display: "flex",
    flexWrap: "wrap",
    // justifyContent: "space-evenly",
  },
  maOptions: {},
  timeframeOptions: {},
};

class ChartOptions extends Component {
  render() {
    const {
      handleMaCheck,
      classes,
      handleCheck,
      plotData,
      fiftyIsChecked,
      twoHundredIsChecked,
      handleTimeframeChange,
    } = this.props;
    return (
      //   <div className={classes.optionsContainer}>
      <div className={classes.ChartOptions}>
        <div className={classes.maOptions}>
          <MovingAverageContainer
            handleMaCheck={handleMaCheck}
            fiftyIsChecked={fiftyIsChecked}
            twoHundredIsChecked={twoHundredIsChecked}
          />
        </div>
        <div className={classes.timeframeOptions}>
          <SetTimeframe
            plotData={plotData}
            handleTimeframeChange={handleTimeframeChange}
          />
        </div>
      </div>
      //   </div>
    );
  }
}

export default withStyles(styles)(ChartOptions);
