import React, { Component } from "react";
import FormLabel from "@material-ui/core/FormLabel";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { getMovingAverages } from "./helpers";

const styles = {
  // MovingAverageContainer: {
  // display: "flex",
  // flexWrap: "wrap",
  // flexDirection: "column",
  // padding: ".5rem",
  // },
  // labelAndOptions: {
  // display: "flex",
  // alignSelf: "flex-start",
  // },
  // maOptionsContainer: {
  // display: "flex",
  // },s
  maLabel: {
    color: "#222",
  },
  lessMargin: {},
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
    console.log("handleMaCheck:", handleMaCheck);
    return (
      <div className={classes.MovingAverageContainer}>
        <FormControl className={classes.labelAndOptions} component="fieldset">
          <FormLabel className={classes.maLabel} component="legend">
            Show Moving Average
          </FormLabel>
          <FormGroup className={classes.maOptionsContainer} row={true}>
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
