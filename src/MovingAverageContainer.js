import React, { Component } from "react";
import FormLabel from "@material-ui/core/FormLabel";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const styles = {
  root: {
    color: "#000714",
    "&.Mui-focused": {
      color: "#000714",
    },
  },
  checkboxText: {
    color: "#4d5964",
  },
  checkboxRoot: {
    color: "#24303a",
    backgroundColor: "transparent",
    "&$checkboxChecked": {
      color: "#24303a",
    },
  },
  checkboxChecked: {},
  checkedStyles: {
    color: "#4d5964",
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
      <div>
        <FormControl component="fieldset">
          <FormLabel className={classes.root} component="legend">
            Moving Average
          </FormLabel>
          <FormGroup row={true}>
            <FormControlLabel
              control={
                <Checkbox
                  checkedIcon={
                    <CheckBoxIcon className={classes.checkedStyles} />
                  }
                  classes={{
                    root: classes.checkboxRoot,
                    checked: classes.checkboxChecked,
                  }}
                  onClick={handleMaCheck}
                  value="50"
                  checked={fiftyIsChecked}
                  color="default"
                />
              }
              label="50-day"
              classes={{ label: classes.checkboxText }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checkedIcon={
                    <CheckBoxIcon className={classes.checkedStyles} />
                  }
                  classes={{
                    root: classes.checkboxRoot,
                    checked: classes.checkboxChecked,
                  }}
                  onClick={handleMaCheck}
                  value="200"
                  checked={twoHundredIsChecked}
                  color="default"
                />
              }
              label="200-day"
              classes={{ label: classes.checkboxText }}
            />
          </FormGroup>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(MovingAverageContainer);
