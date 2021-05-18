import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

const styles = (theme) => ({
  close: {
    padding: theme.spacing(0.5),
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
    let tickerIsDuplicate = userTickers.includes(errorTicker);
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
                {tickerIsDuplicate
                  ? `${errorTicker.toUpperCase()} is already in your watchlist.`
                  : `${errorTicker.toUpperCase()} is not a valid ticker.`}
              </span>
            )
          }
        />
      </Snackbar>
    );
  }
}

export default withStyles(styles)(CustomSnackbar);
