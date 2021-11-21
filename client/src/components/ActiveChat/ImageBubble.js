import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  bubble: ({ imageUrl, otherUser }) => ({
    height: 160,
    width: 160,
    borderRadius: otherUser ? "0 10px 10px 10px" : `10px 10px 0 10px`,
    backgroundImage: `url(${imageUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }),
}));

const ImageBubble = (props) => {
  const classes = useStyles(props);

  return <Box className={classes.bubble} />;
};

export default ImageBubble;
