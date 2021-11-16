import React from "react";
import { useHistory } from "react-router";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { setHexColorAlpha } from "../../utils/color";

const boxShadowColor = setHexColorAlpha("#4A6A95", 0.2);

const useStyles = makeStyles((theme) => ({
  topButton: {
    fontSize: 14,
    padding: theme.spacing(2, 4),
    boxShadow: `0 2px 12px 0px ${boxShadowColor}`,
  },
}));

const LinkButton = (props) => {
  const { children, href } = props;
  const history = useHistory();
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Button
        onClick={() => history.push(href)}
        color="primary"
        size="large"
        className={classes.topButton}
      >
        {children}
      </Button>
    </Box>
  );
};

export default LinkButton;
