import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SideBanner from "./SideBanner";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100%",
    flexWrap: "nowrap",
  },
  left: {
    height: "100%",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  right: {
    flexGrow: 1,
    height: "100%",
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(4),
    overflowY: "auto",
  },
}));

const LoginPageContainer = (props) => {
  const classes = useStyles();
  const { children } = props;

  return (
    <Grid container className={classes.root}>
      <Grid item xs={4} className={classes.left}>
        <SideBanner />
      </Grid>
      <Grid item className={classes.right}>
        {children}
      </Grid>
    </Grid>
  );
};

export default LoginPageContainer;
