import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

class CustomSnackbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const { openSnackbar } = this.props;
    this.setState({ open: openSnackbar });
  }

  handleClick() {
    // NEEDS TO BE PASSED AS PROP
    // PROBABLY ABLE TO SETUP IN NAVBAR INSTEAD OF SCREENCONTAINER
    this.setState({ open: true });
  }
  handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  }

  render() {
    console.log("snackbar");
    const { classes, openSnackbar, userTickers } = this.props;
    let mostRecentTickerAdded =
      userTickers[userTickers.length - 1].toUpperCase();
    console.log("SNACKBAR MOST RECENT: ", mostRecentTickerAdded);
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        // Probably needs to use prop from Navbar instead
        // open={this.state.open}
        open={openSnackbar}
        // autoHideDuration={3000}
        onClose={this.handleClose}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        message={
          <span id="message-id">
            Added {mostRecentTickerAdded} to your watchlist
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }
}

export default withStyles(styles)(CustomSnackbar);
