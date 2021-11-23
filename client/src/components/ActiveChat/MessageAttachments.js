import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import ImageBubble from "./ImageBubble";

const useStyles = makeStyles((theme) => ({
  attachments: ({ otherUser }) => ({
    display: "flex",
    flexDirection: otherUser ? "row" : "row-reverse",
    flexWrap: "wrap",
    gap: theme.spacing(1),
  }),
}));

const MessageAttachments = (props) => {
  const { attachments, otherUser = false } = props;
  const classes = useStyles({ otherUser });
  if (!attachments?.length) return null;
  return (
    <Box className={classes.attachments}>
      {attachments.map((url) => (
        <ImageBubble key={url} imageUrl={url} otherUser={otherUser} />
      ))}
    </Box>
  );
};

export default MessageAttachments;
