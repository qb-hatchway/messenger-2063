import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Form from "./components/Login/Form";
import LoginPageContainer from "./components/Login/LoginPageContainer";
import { login } from "./store/utils/thunkCreators";

const Login = (props) => {
  const { user, login } = props;

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <LoginPageContainer
      topText="Don't have an account?"
      topLinkUrl="/register"
      topLinkText="Create account"
    >
      <Form title="Welcome back!" onSubmit={login} submitButtonText="Login" />
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
