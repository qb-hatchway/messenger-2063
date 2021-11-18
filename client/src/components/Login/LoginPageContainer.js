import React from "react";
import { useHistory } from "react-router";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SideBanner from "./SideBanner";
import { setHexColorAlpha } from "../../utils/color";

const boxShadowColor = setHexColorAlpha("#4A6A95", 0.2);

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
  top: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: theme.spacing(4),
    textAlign: "center",
  },
  main: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 400,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(4),
  },
  linkButton: {
    padding: theme.spacing(2, 4),
    boxShadow: `0 2px 12px 0px ${boxShadowColor}`,
    minWidth: 140,
  },
}));

const LoginPageContainer = (props) => {
  const classes = useStyles();
  const { children, topText, topLinkUrl, topLinkText } = props;
  const history = useHistory();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={4} className={classes.left}>
        <SideBanner />
      </Grid>
      <Grid item className={classes.right}>
        <Box className={classes.top}>
          <Typography color="secondary">{topText}</Typography>
          <Button
            onClick={() => history.push(topLinkUrl)}
            color="primary"
            size="large"
            className={classes.linkButton}
          >
            {topLinkText}
          </Button>
        </Box>
        <Box className={classes.main}>{children}</Box>
      </Grid>
    </Grid>
  );
};

export default LoginPageContainer;
