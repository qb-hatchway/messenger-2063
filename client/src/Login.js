import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import LoginPageContainer from "./components/Login/LoginPageContainer";
import LinkButton from "./components/Login/LinkButton";
import { login } from "./store/utils/thunkCreators";

export const useLoginStyles = makeStyles((theme) => ({
  top: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: theme.spacing(4),
    textAlign: "center",
  },
  main: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 400,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(4),
  },
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
    fontSize: 16,
    fontWeight: "400",
    marginTop: theme.spacing(2),
    padding: theme.spacing(2, 8),
  },
  title: {
    width: "100%",
    fontSize: 26,
    fontWeight: 600,
  },
  forgotLink: {
    fontSize: 12,
    fontWeight: 600,
  },
}));

const Login = (props) => {
  const classes = useLoginStyles();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <LoginPageContainer>
      <Box className={classes.top}>
        <Typography color="secondary">Don't have an account?</Typography>
        <LinkButton href="/register">Create account</LinkButton>
      </Box>

      <Box className={classes.main}>
        <Typography className={classes.title}>Welcome back!</Typography>

        <Box className={classes.form} component="form" onSubmit={handleLogin}>
          <FormControl required fullWidth>
            <TextField
              aria-label="username"
              label="Username"
              name="username"
              type="text"
            />
          </FormControl>

          <FormControl fullWidth required>
            <TextField
              label="Password"
              aria-label="password"
              type="password"
              name="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Link href="#" className={classes.forgotLink}>
                      Forgot?
                    </Link>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <Button
            className={classes.loginButton}
            color="primary"
            type="submit"
            variant="contained"
            size="large"
            disableElevation
          >
            Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
