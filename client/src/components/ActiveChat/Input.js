import React, { useEffect, useMemo, useState } from "react";
import {
  FormControl,
  FilledInput,
  InputAdornment,
  Box,
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
  // attachments: {id: string, url: string}[]
  const [attachments, setAttachments] = useState([]);
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const isAttachmentLoading = useMemo(
    () => attachments.find((x) => !x.url),
    [attachments]
  );

  // clear error message when attachments finish loading
  useEffect(() => {
    if (isAttachmentLoading) setFormErrorMessage("");
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
      attachments: attachments.map((x) => x.url),
    };
    await postMessage(reqBody);
    setText("");
    setAttachments([]);
    setFormErrorMessage("");
  };

  const handleAttachmentUploadStart = (id) =>
    setAttachments((attachments) => [...attachments, { id, url: "" }]);

  const handleAttachmentUploadEnd = (id, url) => {
    const uploadFailed = !url;
    if (uploadFailed) return removeAttachmentById(id);
    setAttachments((attachments) =>
      attachments.map((x) => {
        const isAttachment = x.id === id;
        if (isAttachment) return { ...x, url };
        return x;
      })
    );
  };

  const removeAttachmentById = (id) => {
    setAttachments((attachments) => {
      return attachments.filter((x) => x.id !== id);
    });
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      {!!attachments.length && (
        <Box className={classes.attachments}>
          {attachments.map(({ url, id }) => (
            <AttachmentPreview
              key={id}
              onDelete={() => removeAttachmentById(id)}
              imageUrl={url}
            />
          ))}
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
                onUploadStart={handleAttachmentUploadStart}
                onUploadEnd={handleAttachmentUploadEnd}
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
