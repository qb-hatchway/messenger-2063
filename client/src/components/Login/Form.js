import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  Link,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(5),
  },
  loginButton: {
    fontFamily: "Montserrat",
    marginTop: theme.spacing(2),
    padding: theme.spacing(2, 8),
  },
  title: {
    width: "100%",
  },
}));

const Form = (props) => {
  const classes = useStyles();
  const { submitButtonText, signup, onSubmit, title } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleForm = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email?.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword?.value;
    if (signup && password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }
    onSubmit({ username, email, password });
  };

  return (
    <>
      <Typography variant="h4" className={classes.title}>
        {title}
      </Typography>
      <Box className={classes.form} component="form" onSubmit={handleForm}>
        <FormControl fullWidth>
          <TextField
            aria-label="username"
            label="Username"
            name="username"
            type="text"
            required
          />
        </FormControl>

        {signup && (
          <FormControl fullWidth>
            <TextField
              label="E-mail address"
              aria-label="e-mail address"
              type="email"
              name="email"
              required
            />
          </FormControl>
        )}

        <FormControl fullWidth error={!!formErrorMessage.confirmPassword}>
          <TextField
            aria-label="password"
            label="Password"
            type="password"
            inputProps={{ minLength: 6 }}
            name="password"
            required
            InputProps={{
              endAdornment: !signup && (
                <InputAdornment position="end">
                  <Link href="#">
                    <Typography variant="subtitle1">Forgot?</Typography>
                  </Link>
                </InputAdornment>
              ),
            }}
          />
          <FormHelperText>{formErrorMessage.confirmPassword}</FormHelperText>
        </FormControl>

        {signup && (
          <FormControl fullWidth error={!!formErrorMessage.confirmPassword}>
            <TextField
              label="Confirm Password"
              aria-label="confirm password"
              type="password"
              inputProps={{ minLength: 6 }}
              name="confirmPassword"
              required
            />
            <FormHelperText>{formErrorMessage.confirmPassword}</FormHelperText>
          </FormControl>
        )}

        <Button
          className={classes.loginButton}
          color="primary"
          type="submit"
          variant="contained"
          size="large"
          disableElevation
        >
          {submitButtonText}
        </Button>
      </Box>
    </>
  );
};

export default Form;
