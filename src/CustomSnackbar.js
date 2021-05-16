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
    backgroundColor: red[700],
  },
});

class CustomSnackbar extends Component {
  render() {
    const { classes, openSnackbar, addTickerSuccess, userTickers } = this.props;
    let mostRecentTickerAdded =
      userTickers[userTickers.length - 1].toUpperCase();
    console.log("SNACKBAR MOST RECENT: ", mostRecentTickerAdded);
    console.log("SUCCESS ?", addTickerSuccess);
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
          className={addTickerSuccess ? "" : classes.error}
          message={
            addTickerSuccess ? (
              <span id="message-id">
                Added {mostRecentTickerAdded} to your watchlist
              </span>
            ) : (
              <span id="message-id">
                Failed to add {mostRecentTickerAdded} to your watchlist
              </span>
            )
          }
        />
      </Snackbar>
    );
  }
}

export default withStyles(styles)(CustomSnackbar);
