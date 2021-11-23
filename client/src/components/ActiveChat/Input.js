import React, { useEffect, useState } from "react";
import {
  FormControl,
  FilledInput,
  InputAdornment,
  Box,
  FormHelperText,
  CircularProgress,
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
  const [isAttachmentLoading, setIsAttachmentLoading] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");

  // clear error message when attachments finish loading
  useEffect(() => {
    if (!isAttachmentLoading) setFormErrorMessage("");
  }, [isAttachmentLoading]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isAttachmentLoading)
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
  };

  const showAttachmentLoadingIndicator = () => setIsAttachmentLoading(true);

  const removeAttachmentByUrl = (url) => {
    setAttachments((attachments) => attachments.filter((x) => x !== url));
  };

  const addAttachments = (urls) => {
    setAttachments((attachments) => [...attachments, ...urls]);
    setIsAttachmentLoading(false);
  };

  const showAttachmentsContainer = !!attachments.length || isAttachmentLoading;

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      {showAttachmentsContainer && (
        <Box className={classes.attachments}>
          {attachments.map((url) => (
            <AttachmentPreview
              key={url}
              onDelete={() => removeAttachmentByUrl(url)}
              imageUrl={url}
            />
          ))}
          {isAttachmentLoading && <CircularProgress />}
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
                onUploadStart={showAttachmentLoadingIndicator}
                onUploadComplete={addAttachments}
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
