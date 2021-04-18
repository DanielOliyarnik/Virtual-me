import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { LinearProgress } from "@material-ui/core";

//workaround to get custom colors working with Linear progress
const ColoredLinearProgress = (props) => {
  const { classes, score } = props;
  return (
    <LinearProgress
      style={{ margin: 20 }}
      {...props}
      classes={{
        colorPrimary: classes.colorPrimary,
        barColorPrimary: classes.barColorPrimary,
      }}
    />
  );
};

const styles = (props) => ({
  colorPrimary: {
    backgroundColor: "#fff",
  },
  barColorPrimary: {
    backgroundColor: "#FB8C01",
  },
});

export default withStyles(styles)(ColoredLinearProgress);
