import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    // margin: theme.spacing.unit,
    // marginLeft: ".5rem",
    minWidth: 120,
  },
  timeframeLabel: {
    color: "#222",
    // marginBottom: "-5px",
  },
});

class TimeframeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  // async handleChange(e) {
  //   const { ticker, handleTimeframeChange, plotData } = this.props;
  //   handleTimeframeChange(e);
  //   // plotData(e);
  //   // if (ticker.length) {
  //   //   plotData(e);
  //   // }
  // }

  async handleChange(e) {
    const { ticker, handleTimeframeChange } = this.props;
    handleTimeframeChange(e);
    // plotData(e);
    // if (ticker.length) {
    //   plotData(e);
    // }
  }

  render() {
    const { classes, timeframe } = this.props;
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <FormLabel className={classes.timeframeLabel} component="legend">
            Timeframe
          </FormLabel>
          <Select
            id="timeframeOptions"
            value={timeframe}
            onChange={this.handleChange}
          >
            <MenuItem value="5d">5 Days</MenuItem>
            <MenuItem value="10d">10 Days</MenuItem>
            <MenuItem value="1m">1 Month</MenuItem>
            <MenuItem value="6m">6 Months</MenuItem>
            <MenuItem value="1y">1 Year</MenuItem>
            <MenuItem value="5y">5 Years</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

export default withStyles(styles)(TimeframeSelect);
