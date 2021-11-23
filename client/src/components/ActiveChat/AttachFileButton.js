import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AttachFile from "@material-ui/icons/AttachFile";
import { uploadImageFile } from "../../utils/upload";
import { SnackbarError } from "..";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  iconButton: {
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
  },
}));

const AttachFileButton = (props) => {
  const classes = useStyles();
  const { onUploadStart, onUploadComplete } = props;
  const [showError, setShowError] = useState(false);

  const onChange = async (e) => {
    const files = e.currentTarget.files;
    if (!files.length) return;
    onUploadStart();
    const urls = await Promise.all([...files].map(uploadImageFile));
    const uploadFailed = urls.includes(null);
    if (uploadFailed) setShowError(true);
    const validUrls = urls.filter(Boolean);
    onUploadComplete(validUrls);
  };

  const resetFileInput = (e) => {
    e.target.value = null;
  };

  return (
    <>
      <SnackbarError
        snackBarOpen={showError}
        setSnackBarOpen={setShowError}
        errorMessage={"Upload failed"}
      />
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
        multiple
        onChange={onChange}
        onClick={resetFileInput}
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="secondary"
          aria-label="upload picture"
          component="span"
          className={classes.iconButton}
        >
          <AttachFile />
        </IconButton>
      </label>
    </>
  );
};

export default AttachFileButton;
