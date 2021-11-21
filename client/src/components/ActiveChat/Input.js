import React, { useEffect, useMemo, useState } from "react";
import {
  FormControl,
  FilledInput,
  InputAdornment,
  Box,
  CircularProgress,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import AttachFileButton from "./AttachFileButton";
import AttachmentPreview from "./AttachmentPreview";

const backgroundColor = "#F4F6FA";

const useStyles = makeStyles((theme) => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
    marginBottom: 20,
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(0.5),
  },
  input: {
    height: 70,
    backgroundColor,
    borderRadius: 8,
  },
  attachments: {
    width: "100%",
    borderRadius: 8,
    backgroundColor,
    padding: theme.spacing(2, 1, 1, 1),
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: theme.spacing(2),
  },
}));

const Input = (props) => {
  const classes = useStyles();
  const { postMessage, otherUser, conversationId, user } = props;
  const [text, setText] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [loadingAttachments, setLoadingAttachments] = useState(0);

  const showAttachmentsContainer = !!attachments.length || !!loadingAttachments;

  const attachmentPlaceholders = useMemo(
    () =>
      Array(loadingAttachments)
        .fill()
        .map((_, i) => <CircularProgress key={i} />),
    [loadingAttachments]
  );

	// clear error message when attachments finish loading
  useEffect(() => {
    if (!loadingAttachments) setFormErrorMessage("");
  }, [loadingAttachments]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loadingAttachments)
      return setFormErrorMessage("Attachment is uploading...");

    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments,
    };
    await postMessage(reqBody);
    setText("");
    setAttachments([]);
    setFormErrorMessage("");
  };

  const handleImageUpload = (imageUrl) =>
    setAttachments((attachments) => [...attachments, imageUrl]);

  const removeAttachmentAtIndex = (index) => {
    setAttachments((attachments) => {
      attachments.splice(index, 1);
      return [...attachments];
    });
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      {showAttachmentsContainer && (
        <Box className={classes.attachments}>
          {attachments.map((imageUrl, i) => (
            <AttachmentPreview
              key={i}
              onDelete={() => removeAttachmentAtIndex(i)}
              imageUrl={imageUrl}
            />
          ))}
          {attachmentPlaceholders}
        </Box>
      )}
      <FormControl fullWidth hiddenLabel error={!!formErrorMessage}>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <AttachFileButton
                onImageUpload={handleImageUpload}
                onLoadingStart={(n) => setLoadingAttachments((x) => x + n)}
                onLoadingEnd={() => setLoadingAttachments((x) => x - 1)}
              />
            </InputAdornment>
          }
        />
        <FormHelperText>{formErrorMessage}</FormHelperText>
      </FormControl>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
