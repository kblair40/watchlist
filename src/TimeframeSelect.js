import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Input from "@material-ui/core/Input";

const styles = (theme) => ({
  root: {
    color: "#1e2730",
    fontWeight: "500",
    "&.Mui-focused": {
      color: "#1e2730",
    },
  },
  underline: {
    borderBottom: "1px solid #4a667a",
    "&:after": {
      // The MUI source seems to use this but it doesn't work
      borderBottom: "1px solid #4a667a",
    },
  },
  formControl: {
    minWidth: 120,
  },
});

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
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <FormLabel className={classes.root} component="legend">
            Timeframe
          </FormLabel>
          <Select
            id="timeframeOptions"
            value={timeframe}
            onChange={this.handleChange}
            input={
              <Input
                classes={{ underline: classes.underline }}
                id="maOptions"
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
      </form>
    );
  }
}

export default withStyles(styles)(TimeframeSelect);
