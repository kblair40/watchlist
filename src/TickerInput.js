import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SimpleReactValidator from "simple-react-validator";
import TextField from "@material-ui/core/TextField";

import green from "@material-ui/core/colors/green";
import Icon from "@material-ui/core/Icon";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    flexBasis: 200,
  },
  icon: {
    fontSize: "1.8rem",
    color: green[600],
    "&:hover": {
      color: green[800],
    },
  },
  tickerInput: {
    // width: "90%",
    // marginBottom: "2px",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
  },
  inputLabel: {
    marginLeft: "5%",
  },
});
// handleTickerChange={handleTickerChange}
// addTicker={addTicker}
// const TEST_REGEX = /^[a-z]{1,4}$/i;

class TickerInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickerInput: "",
      error: false,
    };
    this.validator = new SimpleReactValidator();
  }

  clearInput() {
    let input = document.getElementById("newTickerInput");
    input.value = "";
  }

  render() {
    const { classes, tickerInput, handleTickerChange, addTicker } = this.props;
    console.log("CURRENT INPUT:", tickerInput);
    return (
      <div>
        <FormControl
          component="form"
          // error={error}
          className={classes.textField}
        >
          <div className={classes.inputContainer}>
            <InputLabel className={classes.inputLabel} htmlFor="tickerInput">
              Add Ticker
            </InputLabel>
            <Input
              id="newTickerInput"
              type="text"
              className={classes.tickerInput}
              margin="dense"
              // error={false}
              onChange={handleTickerChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={addTicker} type="submit">
                    <Icon className={classes.icon} color="primary">
                      add_circle
                    </Icon>
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(TickerInput);
