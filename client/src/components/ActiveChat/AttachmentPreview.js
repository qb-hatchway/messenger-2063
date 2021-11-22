import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, CircularProgress, Fab } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  image: ({ imageUrl }) => ({
    height: 80,
    width: 80,
    borderRadius: 10,
    backgroundImage: `url(${imageUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }),
  deleteButton: {
    height: 24,
    width: 32,
    position: "absolute",
    top: theme.spacing(-1),
    right: theme.spacing(-1),
    color: theme.palette.error.contrastText,
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

const AttachmentPreview = (props) => {
  const { imageUrl, onDelete } = props;
  const classes = useStyles({ imageUrl });

  if (!imageUrl) return <CircularProgress />;

  return (
    <Box className={classes.root}>
      <Fab
        className={classes.deleteButton}
        aria-label="delete"
        onClick={onDelete}
      >
        <DeleteIcon />
      </Fab>
      <Box className={classes.image} />
    </Box>
  );
};

export default AttachmentPreview;
