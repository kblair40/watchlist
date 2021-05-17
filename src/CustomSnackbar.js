import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import red from "@material-ui/core/colors/red";
import ErrorIcon from "@material-ui/icons/Error";

const styles = (theme) => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
  error: {
    backgroundColor: "#ef6670",
  },
  success: {
    backgroundColor: "#48c15e",
  },
});

class CustomSnackbar extends Component {
  render() {
    const {
      classes,
      openSnackbar,
      errorTicker,
      addTickerSuccess,
      userTickers,
    } = this.props;
    let mostRecentTickerAdded =
      userTickers[userTickers.length - 1].toUpperCase();
    console.log("SNACKBAR MOST RECENT: ", mostRecentTickerAdded);
    console.log("SUCCESS ?", addTickerSuccess);
    console.log("ERROR TICKER:", errorTicker);
    let tickerIsDuplicate = userTickers.includes(errorTicker);
    console.log("DUPLICATE ?", tickerIsDuplicate);
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        // Probably needs to use prop from Navbar instead
        open={openSnackbar}
        onClose={this.handleClose}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
      >
        <SnackbarContent
          className={addTickerSuccess ? classes.success : classes.error}
          message={
            addTickerSuccess ? (
              <span id="message-id">
                Added {mostRecentTickerAdded} to your watchlist
              </span>
            ) : (
              <span id="message-id">
                Failed to add {errorTicker.toUpperCase()} to your watchlist.
                &nbsp;
                {tickerIsDuplicate
                  ? "Ticker is already in your watchlist."
                  : "Ticker is invalid."}
              </span>
            )
          }
        />
      </Snackbar>
    );
  }
}

export default withStyles(styles)(CustomSnackbar);
