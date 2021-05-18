import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioButtonIcon from "@material-ui/icons/RadioButtonChecked";

const styles = {
  root: {
    color: "#000714",
    "&.Mui-focused": {
      color: "#000714",
    },
  },
  labelText: {
    color: "#4d5964",
  },
  checkedStyles: {
    color: "#4d5964",
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
          >
            <FormControlLabel
              value="5d"
              control={
                <Radio
                  checkedIcon={
                    <RadioButtonIcon className={classes.checkedStyles} />
                  }
                />
              }
              label="5 Days"
              classes={{ label: classes.labelText }}
            />
            <FormControlLabel
              value="10d"
              control={
                <Radio
                  checkedIcon={
                    <RadioButtonIcon className={classes.checkedStyles} />
                  }
                />
              }
              label="10 Days"
              classes={{ label: classes.labelText }}
            />
            <FormControlLabel
              value="1m"
              control={
                <Radio
                  checkedIcon={
                    <RadioButtonIcon className={classes.checkedStyles} />
                  }
                />
              }
              label="1 Month"
              classes={{ label: classes.labelText }}
            />
            <FormControlLabel
              value="6m"
              control={
                <Radio
                  checkedIcon={
                    <RadioButtonIcon className={classes.checkedStyles} />
                  }
                />
              }
              label="6 Months"
              classes={{ label: classes.labelText }}
            />
            <FormControlLabel
              value="1y"
              control={
                <Radio
                  checkedIcon={
                    <RadioButtonIcon className={classes.checkedStyles} />
                  }
                />
              }
              label="1 Year"
              classes={{ label: classes.labelText }}
            />
            <FormControlLabel
              value="5y"
              control={
                <Radio
                  checkedIcon={
                    <RadioButtonIcon className={classes.checkedStyles} />
                  }
                />
              }
              label="5 Years"
              classes={{ label: classes.labelText }}
            />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}
export default withStyles(styles)(SetTimeframe);
