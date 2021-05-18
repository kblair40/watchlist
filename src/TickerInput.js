import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

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
    color: "#48c15e",
    "&:hover": {
      color: "#48c15e",
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  cssLabel: {
    "&$inputFocused": {
      color: "#24303a",
    },
    "&$inputError": {
      color: "#ef6670",
    },
  },
  inputFocused: {},
  inputError: {},
  cssUnderline: {
    "&:after": {
      borderBottomColor: "#24303a",
    },
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

  isError() {
    const { isValidInput, tickerInput } = this.props;
    // IS ERROR IF...
    //  invalid input AND there's at least 1 char for the input
    if (!isValidInput && tickerInput.length > 0) {
      return true;
    } else if (
      isValidInput ||
      tickerInput.length === 0 ||
      !this.state.isFocused
    ) {
      return false;
    }
  }

  render() {
    const { classes, isValidInput, handleTickerChange, addTicker } = this.props;
    let error = this.isError();
    return (
      <div className={classes.root}>
        <FormControl error={error} component="form" className={classes.margin}>
          <InputLabel
            htmlFor="new-ticker-input"
            error={error}
            shrink={this.state.isFocused}
            classes={{
              root: classes.cssLabel,
              focused: classes.inputFocused,
              error: classes.inputError,
            }}
          >
            {error ? "Invalid Ticker" : "Add Ticker"}
          </InputLabel>
          <Input
            id="new-ticker-input"
            classes={{ underline: classes.cssUnderline }}
            onBlur={this.loseFocus}
            onFocus={this.getFocus}
            onChange={handleTickerChange}
            endAdornment={
              <IconButton
                disabled={!isValidInput}
                onClick={addTicker}
                type="submit"
              >
                <Icon className={classes.icon}>add_circle</Icon>
              </IconButton>
            }
          />
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(TickerInput);

// return (
//   <FormControl component="form" className={classes.textField}>
//     <div className={classes.inputContainer}>
//       <div>
//         <TextField
//           id="newTickerInput"
//           type="text"
//           // className={classes.tickerInput}
//           error={error}
//           margin="dense"
//           InputProps={{
//             classes: {
//               root: classes.inputRoot,
//               error: classes.error,
//             },
//           }}
//           InputLabelProps={{
//             classes: {
//               root: classes.inputLabelRoot,
//             },
//           }}
//           label={this.state.isFocused ? " " : "Add Ticker"}
//           helperText={
//             error
//               ? "Invalid Input"
//               : this.state.isFocused
//               ? "Add Ticker"
//               : " "
//           }
//           onBlur={this.loseFocus}
//           onFocus={this.getFocus}
//           onChange={handleTickerChange}
//         />
//       </div>
//       <div>
//         <IconButton
//           disabled={!isValidInput}
//           onClick={addTicker}
//           type="submit"
//         >
//           <Icon className={classes.icon}>add_circle</Icon>
//         </IconButton>
//       </div>
//     </div>
//   </FormControl>
// );
