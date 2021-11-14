import React, { useMemo } from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Search, Chat, CurrentUser } from "./index.js";

const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: 21,
    paddingRight: 21,
    flexGrow: 1
  },
  title: {
    fontSize: 20,
    letterSpacing: -0.29,
    fontWeight: "bold",
    marginTop: 32,
    marginBottom: 15
  }
}));

const Sidebar = (props) => {
  const classes = useStyles();
  const { handleChange, searchTerm } = props;

  const conversations = useMemo(() => {
    if (!props.conversations) return [];
    return props.conversations.sort((a, b) => {
      // sort empty conversations to the end
      const bIsEmpty = b.messages.length === 0;
      const aIsEmpty = a.messages.length === 0;
      if (bIsEmpty || aIsEmpty) return aIsEmpty - bIsEmpty;
      // sort conversations by most recent message (descending)
      // messages must be pre-sorted from oldest to newest
      return (
        Date.parse(b.messages[b.messages.length - 1].createdAt) -
        Date.parse(a.messages[a.messages.length - 1].createdAt)
      );
    });
  }, [props.conversations]);

  return (
    <Box className={classes.root}>
      <CurrentUser />
      <Typography className={classes.title}>Chats</Typography>
      <Search handleChange={handleChange} />
      {conversations
        .filter((conversation) => conversation.otherUser.username.includes(searchTerm))
        .map((conversation) => {
          return <Chat conversation={conversation} key={conversation.otherUser.username} />;
        })}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    conversations: state.conversations
  };
};

export default connect(mapStateToProps)(Sidebar);
