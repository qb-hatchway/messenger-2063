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
  const { onImageUpload, onLoadingStart, onLoadingEnd } = props;
  const [showError, setShowError] = useState(false);

  const onChange = (e) => {
    const files = e.currentTarget.files;
    if (!files.length) return;
    // tell parent how many files are waiting to upload
    onLoadingStart(files.length);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      uploadImageFile(file).then((url) => {
        onLoadingEnd();
        setShowError(!url);
        if (url) onImageUpload(url);
      });
    }
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
        onClick={(event) => {
          event.target.value = null;
        }}
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
