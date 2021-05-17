import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import green from "@material-ui/core/colors/green";
import Icon from "@material-ui/core/Icon";

const styles = (theme) => ({
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
    marginBottom: 0,
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
  },
});

class TickerInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      valid: false,
    };
    this.getFocus = this.getFocus.bind(this);
    // this.loseFocus = this.loseFocus.bind(this);
  }

  getFocus(e) {
    this.setState({ isFocused: true });
    this.props.handleInputFocus(e);
  }

  // loseFocus() {
  //   this.setState({ isFocused: false });
  //   this.props.handleInputBlur();
  // }

  clearInput() {
    let input = document.getElementById("newTickerInput");
    input.value = "";
  }

  getLabel() {
    if (this.state.isFocused && !this.props.isValidInput) {
      return "Invalid Input";
    } else if (!this.state.isFocused) {
      return " ";
    }
    return "Add Ticker";
  }

  render() {
    const { classes, isValidInput, handleTickerChange, addTicker } = this.props;
    let label = this.getLabel();
    return (
      <FormControl component="form" className={classes.textField}>
        <div className={classes.inputContainer}>
          <div className={classes.tickerInput}>
            <TextField
              id="newTickerInput"
              type="text"
              className={classes.tickerInput}
              margin="dense"
              label={this.state.isFocused ? " " : "Add Ticker"}
              helperText={label}
              // onBlur={this.loseFocus}
              onFocus={this.getFocus}
              error={!isValidInput}
              onChange={handleTickerChange}
            />
          </div>
          <div className={classes.tickerInputBtn}>
            <IconButton
              // disabled={!this.state.isFocused || !isValidInput}
              disabled={!isValidInput}
              onClick={addTicker}
              type="submit"
            >
              <Icon className={classes.icon} color="primary">
                add_circle
              </Icon>
            </IconButton>
          </div>
        </div>
      </FormControl>
    );
  }
}

export default withStyles(styles)(TickerInput);
