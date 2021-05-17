import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import red from "@material-ui/core/colors/red";
import CustomSnackbar from "./CustomSnackbar";

const styles = {
  trash: {
    color: red[600],
    fontSize: "1.8rem",
    "&:hover": {
      color: red[800],
    },
  },
  watchlistContainer: {
    overflowY: "auto",
  },
};
class Watchlist extends Component {
  setWatchlistHeight() {
    return this.props.drawerHeight - 300;
  }
  render() {
    const {
      classes,
      addTickerSuccess,
      openSnackbar,
      handleClick,
      userTickers,
      deleteTicker,
      errorTicker,
    } = this.props;
    return (
      <div style={{ maxHeight: this.setWatchlistHeight }}>
        <List className={classes.watchlistContainer}>
          {userTickers.map((ticker) => (
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <DeleteForeverOutlinedIcon
                  onClick={(e) => deleteTicker(e, ticker)}
                  className={classes.trash}
                />
              </ListItemIcon>
              <ListItemText primary={ticker.toUpperCase()} />
            </ListItem>
          ))}
        </List>
        <CustomSnackbar
          addTickerSuccess={addTickerSuccess}
          openSnackbar={openSnackbar}
          userTickers={userTickers}
          errorTicker={errorTicker}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Watchlist);
