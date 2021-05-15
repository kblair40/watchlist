import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  tooltipDate: {
    fontSize: "14px",
    marginBottom: "-10px",
  },
  tooltipPrice: {
    fontSize: "14px",
    fontWeight: "600",
  },
  tooltipTicker: {
    marginBottom: "-10px",
  },
  tooltipContentContainer: {
    height: "3rem",
    padding: 5,
  },
};

class CustomTooltip extends Component {
  render() {
    let { active, payload, label, classes } = this.props;
    if (active) {
      return (
        <Card>
          <CardContent className={classes.tooltipContentContainer}>
            <span className={classes.tooltipPrice}>
              USD ${payload && payload.length ? payload[0].value : ""}
            </span>
            <br />
            <span className={classes.tooltipDate}>{label}</span>
          </CardContent>
        </Card>
      );
    }
    return null;
  }
}

export default withStyles(styles)(CustomTooltip);
