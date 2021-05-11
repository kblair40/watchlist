import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  data: {
    color: "red",
    fontWeight: "700",
    float: "right",
  },
  section: {
    border: "1px solid #bbb",
    display: "inline-flex",
    justifyContent: "space-between",
    width: "50%",
    padding: ".2rem",
  },
  category: {},
};

class DataItem extends Component {
  render() {
    const { category, data, classes } = this.props;
    return (
      <div className={classes.section}>
        <span className={classes.category}>{category}</span>
        <span className={classes.data}>{data}</span>
      </div>
    );
  }
}

export default withStyles(styles)(DataItem);
