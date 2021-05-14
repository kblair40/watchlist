import React, { Component } from "react";
import FormLabel from "@material-ui/core/FormLabel";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const styles = {
  maLabel: {
    color: "#222",
  },
};

class MovingAverageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fifty: null,
      twoHundred: null,
    };
  }

  render() {
    const { classes, handleMaCheck, fiftyIsChecked, twoHundredIsChecked } =
      this.props;
    return (
      <div className={classes.MovingAverageContainer}>
        <FormControl className={classes.labelAndOptions} component="fieldset">
          <FormLabel className={classes.maLabel} component="legend">
            Moving Average
          </FormLabel>
          <FormGroup row={true}>
            <FormControlLabel
              control={
                <Checkbox
                  onClick={handleMaCheck}
                  value="50"
                  checked={fiftyIsChecked}
                />
              }
              label="50-day"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onClick={handleMaCheck}
                  value="200"
                  checked={twoHundredIsChecked}
                />
              }
              label="200-day"
            />
          </FormGroup>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(MovingAverageContainer);
