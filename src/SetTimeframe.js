import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const styles = {
  root: {
    color: "#1e2730",
    fontWeight: "500",
    "&.Mui-focused": {
      color: "#1e2730",
    },
  },
};

class SetTimeframe extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(e) {
    this.props.handleTimeframeChange(e);
  }

  render() {
    const { classes, timeframe } = this.props;
    return (
      <div>
        <FormControl component="fieldset">
          <FormLabel className={classes.root} component="legend">
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
            <FormControlLabel
              value="5d"
              control={<Radio color="default" />}
              label="5 Days"
            />
            <FormControlLabel
              value="10d"
              control={<Radio color="default" />}
              label="10 Days"
            />
            <FormControlLabel
              value="1m"
              control={<Radio color="default" />}
              label="1 Month"
            />
            <FormControlLabel
              value="6m"
              control={<Radio color="default" />}
              label="6 Months"
            />
            <FormControlLabel
              value="1y"
              control={<Radio color="default" />}
              label="1 Year"
            />
            <FormControlLabel
              value="5y"
              control={<Radio color="default" />}
              label="5 Years"
            />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}
export default withStyles(styles)(SetTimeframe);
