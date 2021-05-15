import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
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
      isFocused: false,
    };
    this.validator = new SimpleReactValidator();
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
    if (this.state.isFocused && !this.props.isValidInput) {
      return "Invalid Input";
    } else if (!this.state.isFocused) {
      return " ";
    }
    return "Add Ticker";
  }

  render() {
    const {
      classes,
      isValidInput,
      tickerInput,
      handleTickerChange,
      addTicker,
    } = this.props;
    console.log("CURRENT INPUT:", tickerInput);
    let label = this.getLabel();
    return (
      <FormControl component="form" className={classes.textField}>
        <div className={classes.inputContainer}>
          {/* <InputLabel className={classes.inputLabel} htmlFor="tickerInput">
            Add Ticker
          </InputLabel> */}
          <TextField
            id="newTickerInput"
            type="text"
            className={classes.tickerInput}
            margin="dense"
            label={this.state.isFocused ? " " : "Add Ticker"}
            helperText={label}
            onBlur={this.loseFocus}
            onFocus={this.getFocus}
            error={!isValidInput}
            onChange={handleTickerChange}
            // endAdornment={
            //   <InputAdornment position="end">
            //     <IconButton
            //       disabled={!this.state.isFocused || !isValidInput}
            //       onClick={addTicker}
            //       type="submit"
            //     >
            //       <Icon className={classes.icon} color="primary">
            //         add_circle
            //       </Icon>
            //     </IconButton>
            //   </InputAdornment>
            // }
          />
          <IconButton
            disabled={!this.state.isFocused || !isValidInput}
            onClick={addTicker}
            type="submit"
          >
            <Icon className={classes.icon} color="primary">
              add_circle
            </Icon>
          </IconButton>
        </div>
      </FormControl>
    );
  }
}

export default withStyles(styles)(TickerInput);
