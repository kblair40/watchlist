import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const styles = {
  timeframes: {
    whiteSpace: "nowrap",
  },
  timeframeLabel: {
    color: "#222",
  },
  radioGroup: {
    display: "flex",
    flexWrap: "nowrap",
  },
};

class SetTimeframe extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(e) {
    const { ticker, handleTimeframeChange, plotData } = this.props;
    handleTimeframeChange(e);
    plotData(e);
    if (ticker.length) {
      plotData(e);
    }
  }

  render() {
    const { classes, timeframe } = this.props;
    return (
      <div className={classes.timeframes}>
        <FormControl component="fieldset">
          <FormLabel className={classes.timeframeLabel} component="legend">
            Timeframe
          </FormLabel>
          <RadioGroup
            aria-label="Timeframe"
            name="timeframe"
            row={true}
            value={timeframe}
            onChange={this.handleChange}
            className={classes.radioGroup}
          >
            <FormControlLabel value="5d" control={<Radio />} label="5 Days" />
            <FormControlLabel value="10d" control={<Radio />} label="10 Days" />
            <FormControlLabel value="1m" control={<Radio />} label="1 Month" />
            <FormControlLabel value="6m" control={<Radio />} label="6 Months" />
            <FormControlLabel value="1y" control={<Radio />} label="1 Year" />
            <FormControlLabel value="5y" control={<Radio />} label="5 Years" />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}
export default withStyles(styles)(SetTimeframe);
