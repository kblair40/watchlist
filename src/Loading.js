import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  loader: {
    backgroundColor: "#ccc",
  },
  bar: {
    backgroundColor: "#aaa",
  },
}));

export default function Loading() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress
        classes={{ root: classes.loader, bar: classes.bar }}
        variant="query"
      />
      <LinearProgress classes={{ root: classes.loader, bar: classes.bar }} />
    </div>
  );
}
