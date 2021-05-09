import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

class WatchlistItem extends Component {
  render() {
    const { ticker, handleClick, deleteTicker } = this.props;
    return (
      <div>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <IconButton onClick={(e) => deleteTicker(e, ticker)}>
              <DeleteIcon color="secondary" />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary={ticker.toUpperCase()} />
        </ListItem>
        <Divider light={true} />
      </div>
    );
  }
}

export default WatchlistItem;
