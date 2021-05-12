import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  WatchlistItem: {
    // marginBottom: "-.3rem",
    // padding: "0.5rem",
    // height: "2.5rem",
    // height: "100%",
  },
  // listItem: {
  //   height: "100%",
  // },
};

class WatchlistItem extends Component {
  render() {
    const { ticker, handleClick, deleteTicker, classes } = this.props;
    return (
      <div className={classes.WatchlistItem}>
        {/* <div className={classes.listItem}> */}
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <IconButton onClick={(e) => deleteTicker(e, ticker)}>
              <DeleteIcon color="secondary" />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary={ticker.toUpperCase()} />
        </ListItem>
        <Divider light={true} />
        {/* </div> */}
      </div>
    );
  }
}

export default withStyles(styles)(WatchlistItem);
