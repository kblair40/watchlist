import React, { Component } from "react";
import FormLabel from "@material-ui/core/FormLabel";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { getMovingAverages } from "./helpers";

const styles = {
  MovingAverageContainer: {
    // border: "1px solid red",
    // alignSelf: "end",
    display: "flex",
    flexWrap: "wrap",
  },
  maLabel: {
    textAlign: "center",
    color: "#222",
    marginBottom: "-5px",
  },
  lessMargin: {
    marginBottom: "-5px",
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

  // componentDidMount() {
  //   const { ticker } = this.props;
  // }

  render() {
    // console.log("MovingAverageContainer");
    // console.log("PROPS:", this.props.movingAverages);
    const { classes, handleCheck, fiftyIsChecked, twoHundredIsChecked } =
      this.props;
    return (
      <div className={classes.MovingAverageContainer}>
        <FormControl
          // className={classes.MovingAverageContainer}
          component="fieldset"
        >
          <FormLabel className={classes.maLabel} component="legend">
            Show Moving Average
          </FormLabel>
          <FormGroup row={true}>
            <FormControlLabel
              className={classes.lessMargin}
              control={
                <Checkbox
                  onClick={handleCheck}
                  value="50"
                  checked={fiftyIsChecked}
                  className={classes.lessMargin}
                />
              }
              label="50-day"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onClick={handleCheck}
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

// const styles = {
//     MovingAverageContainer: {
//       border: "2px solid red",
//     },
//   };
