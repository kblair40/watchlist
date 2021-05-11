import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const styles = {
  timeframes: {
    alignSelf: "end",
    display: "flex",
    justifyContent: "flex-start",
    alignContent: "center",
    flexWrap: "wrap",
    marginTop: ".5rem",
  },
  timeframeLabel: {
    color: "#222",
  },
  radioGroup: {
    width: "100%",
    minWidth: "515px",
    display: "flex",
    flexWrap: "wrap",
  },
  lessMargin: {
    marginRight: "-5px",
  },
  timeframeOptions1: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  timeframeOptions2: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  timeframeOption: {
    height: "2rem",
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
    // plotData(e);
    // if (ticker.length) {
    //   plotData(e);
    // }
  }

  render() {
    const { classes, handleTimeframeChange } = this.props;
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
            onChange={this.handleChange}
            className={classes.radioGroup}
          >
            <div className={classes.timeframeOptions1}>
              <FormControlLabel
                className={classes.timeframeOption}
                value="5d"
                control={<Radio />}
                label="5 Days"
              />
              <FormControlLabel
                className={classes.timeframeOption}
                value="10d"
                control={<Radio />}
                label="10 Days"
              />
              <FormControlLabel
                className={classes.timeframeOption}
                value="1m"
                control={<Radio />}
                label="1 Month"
              />
            </div>
            <div className={classes.timeframeOptions2}>
              <FormControlLabel
                className={classes.timeframeOption}
                value="6m"
                control={<Radio />}
                label="6 Months"
              />
              <FormControlLabel
                className={classes.timeframeOption}
                value="1y"
                control={<Radio />}
                label="1 Year"
              />
              <FormControlLabel
                className={classes.timeframeOption}
                value="5y"
                control={<Radio />}
                label="5 Years"
              />
            </div>
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}
export default withStyles(styles)(SetTimeframe);

// const styles = {
//   timeframes: {
//     display: "flex",
//     width: "100%",
//     justifyContent: "space-between",
//     maxWidth: "1050px",
//     minWidth: "275px",
//     flexWrap: "wrap",
//   },
//   timeframeLabel: {
//     color: "black",
//   },
//   radioGroup: {
//     margin: "0px",
//   },
// };
