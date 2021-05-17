import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import Icon from "@material-ui/core/Icon";

const styles = (theme) => ({
  textField: {
    flexBasis: 200,
  },
  icon: {
    fontSize: "1.8rem",
    color: "#48c15e", // green[600]
    "&:hover": {
      color: "#48c15e", //green[800],
    },
  },
  tickerInput: {
    marginBottom: 0,
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
  },
  inputRoot: {
    color: "#4a667a",
    "&:after": {
      borderBottomColor: "#1e2730",
    },
    "&.Mui-error:after": {
      borderBottomColor: "#ef6670",
    },
  },
  inputLabelRoot: {
    color: "rgba(36, 48, 58, 0.5)",
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
    this.loseFocus = this.loseFocus.bind(this);
  }

  getFocus(e) {
    this.setState({ isFocused: true });
    this.props.handleInputFocus(e);
  }

  loseFocus() {
    this.setState({ isFocused: false });
    this.props.handleInputBlur();
  }

  clearInput() {
    let input = document.getElementById("newTickerInput");
    input.value = "";
  }

  getLabel() {
    if (
      this.state.isFocused &&
      !this.props.isValidInput &&
      this.props.tickerInput.length > 0
    ) {
      return "Invalid Input";
    } else if (!this.state.isFocused) {
      return " ";
    }
    return "Add Ticker";
  }

  isError() {
    const { isValidInput, tickerInput } = this.props;
    if (!isValidInput && tickerInput.length > 0) {
      return true;
    } else if (isValidInput || tickerInput.length === 0) {
      return false;
    }

    // IS ERROR IF...
    //  invalid input (number, special char)

    // NOT ERROR IF...
    //  not focused on input and input is empty, OR, if input is empty
  }

  render() {
    const {
      classes,
      isValidInput,
      handleTickerChange,
      addTicker,
      tickerInput,
    } = this.props;
    let label = this.getLabel();
    let error = this.isError();
    return (
      <FormControl component="form" className={classes.textField}>
        <div className={classes.inputContainer}>
          <div>
            <TextField
              id="newTickerInput"
              type="text"
              // className={classes.tickerInput}
              error={error}
              margin="dense"
              InputProps={{
                classes: {
                  root: classes.inputRoot,
                  error: classes.error,
                },
              }}
              InputLabelProps={{
                classes: {
                  root: classes.inputLabelRoot,
                },
              }}
              label={this.state.isFocused ? " " : "Add Ticker"}
              helperText={
                error
                  ? "Invalid Input"
                  : this.state.isFocused
                  ? "Add Ticker"
                  : " "
              }
              onBlur={this.loseFocus}
              onFocus={this.getFocus}
              onChange={handleTickerChange}
            />
          </div>
          <div>
            <IconButton
              disabled={!isValidInput}
              onClick={addTicker}
              type="submit"
            >
              <Icon className={classes.icon}>add_circle</Icon>
            </IconButton>
          </div>
        </div>
      </FormControl>
    );
  }
}

export default withStyles(styles)(TickerInput);
