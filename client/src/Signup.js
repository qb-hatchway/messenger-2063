import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@material-ui/core";
import LoginPageContainer from "./components/Login/LoginPageContainer";
import LinkButton from "./components/Login/LinkButton";
import { useLoginStyles } from "./Login";
import { register } from "./store/utils/thunkCreators";

const Signup = (props) => {
  const classes = useLoginStyles();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <LoginPageContainer>
      <Box className={classes.top}>
        <Typography color="secondary">Already have an account?</Typography>
        <LinkButton href="/login">Login</LinkButton>
      </Box>

      <Box className={classes.main}>
        <Typography className={classes.title}>Create an account.</Typography>

        <Box
          className={classes.form}
          component="form"
          onSubmit={handleRegister}
        >
          <FormControl fullWidth>
            <TextField
              aria-label="username"
              label="Username"
              name="username"
              type="text"
              required
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              label="E-mail address"
              aria-label="e-mail address"
              type="email"
              name="email"
              required
            />
          </FormControl>

          <FormControl fullWidth error={!!formErrorMessage.confirmPassword}>
            <TextField
              aria-label="password"
              label="Password"
              type="password"
              inputProps={{ minLength: 6 }}
              name="password"
              required
            />
            <FormHelperText>{formErrorMessage.confirmPassword}</FormHelperText>
          </FormControl>

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

          <Button
            className={classes.loginButton}
            color="primary"
            type="submit"
            variant="contained"
            size="large"
            disableElevation
          >
            Create
          </Button>
        </Box>
      </Box>
    </LoginPageContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
