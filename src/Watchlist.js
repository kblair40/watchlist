import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import CustomSnackbar from "./CustomSnackbar";

const styles = {
  trash: {
    color: "#ef6670",
    fontSize: "1.8rem",
    "&:hover": {
      color: "#ef6670",
    },
  },
  watchlistContainer: {
    overflowY: "auto",
    color: "#24303a",
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
            <ListItem button key={ticker} onClick={handleClick}>
              <ListItemIcon>
                <DeleteForeverOutlinedIcon
                  onClick={(e) => deleteTicker(e, ticker)}
                  className={classes.trash}
                />
              </ListItemIcon>
              <ListItemText
                disableTypography={true}
                primary={ticker.toUpperCase()}
              />
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
