import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Input from "@material-ui/core/Input";

const styles = {
  root: {
    color: "#4d5964",
    "&$inputFocused": {
      backgroundColor: "#fff",
      color: "#4d5964",
    },
  },
  inputFocused: {},
  labelRoot: {
    color: "#000714",
    "&$labelFocused": {
      color: "#000714",
    },
  },
  labelFocused: {},
  underline: {
    borderBottom: "1px solid #24303a",
    "&:after": {
      borderBottom: "1px solid #24303a",
    },
  },
};

class TimeframeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(e) {
    this.props.handleTimeframeChange(e);
  }

  render() {
    const { classes, timeframe } = this.props;
    return (
      <div className={classes.root}>
        <FormControl>
          <FormLabel
            classes={{
              root: classes.labelRoot,
              focused: classes.labelFocused,
            }}
            component="legend"
            htmlFor="timeframeOptions"
          >
            Timeframe
          </FormLabel>
          <Select
            id="timeframeOptions"
            value={timeframe}
            onChange={this.handleChange}
            input={
              <Input
                classes={{
                  root: classes.root,
                  underline: classes.underline,
                  focused: classes.inputFocused,
                }}
              />
            }
          >
            <MenuItem value="5d">5 Days</MenuItem>
            <MenuItem value="10d">10 Days</MenuItem>
            <MenuItem value="1m">1 Month</MenuItem>
            <MenuItem value="6m">6 Months</MenuItem>
            <MenuItem value="1y">1 Year</MenuItem>
            <MenuItem value="5y">5 Years</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(TimeframeSelect);
