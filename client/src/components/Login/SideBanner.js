import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import bgImage from "../../assets/images/bg-img.png";
import { ReactComponent as BubbleIcon } from "../../assets/images/bubble.svg";
import { setHexColorAlpha } from "../../utils/color";

const color1 = setHexColorAlpha("#3A8DFF", 0.85);
const color2 = setHexColorAlpha("#86B9FF", 0.85);

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    padding: theme.spacing(0, 2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(5),
    color: "white",
    backgroundImage: `linear-gradient(to bottom, ${color1}, ${color2}), url(${bgImage});`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  text: {
    width: "100%",
    maxWidth: 296,
    textAlign: "center",
    lineHeight: "40px",
    fontWeight: "normal",
  },
}));

const SideBanner = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <BubbleIcon />
      <Typography variant='h4' className={classes.text}>
        Converse with anyone with any language
      </Typography>
    </Box>
  );
};

export default SideBanner;