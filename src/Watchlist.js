import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import red from "@material-ui/core/colors/red";

const styles = {
  trash: {
    color: red[600],
    fontSize: "1.8rem",
    "&:hover": {
      color: red[800],
    },
  },
};
class Watchlist extends Component {
  render() {
    const { classes, handleClick, userTickers, deleteTicker, plotData } =
      this.props;
    return (
      <List>
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
    );
  }
}

{
  /* <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */
}

export default withStyles(styles)(Watchlist);
