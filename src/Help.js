import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
  paper: {
    position: "absolute",
    // width: theme.spacing.unit * 50,
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none",
    // margin: "0 auto",
    left: "25%",
    top: "10%",
  },
});

class Help extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button onClick={this.handleOpen}>Need help?</Button>
        <Modal open={this.state.open} onClose={this.handleClose}>
          <div className={classes.paper}>
            <Typography variant="body1">
              If you are unable to retrieve new data, add new tickers etc... It
              is highly likely due to a CORS issue. <br />
              <br />
              Click on the link corresponding to your browser below for an
              explanation on how to disable CORS.
              <li>
                <a
                  target="_blank"
                  href="https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf"
                >
                  Chrome (plug-in needed)
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://stackoverflow.com/questions/4556429/disabling-same-origin-policy-in-safari"
                >
                  Safari (1st answer)
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/"
                >
                  Firefox (plug-in needed)
                </a>
              </li>
            </Typography>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(Help);
