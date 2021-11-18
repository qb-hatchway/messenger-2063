import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import LoginPageContainer from "./components/Login/LoginPageContainer";
import { register } from "./store/utils/thunkCreators";
import Form from "./components/Login/Form";

const Signup = (props) => {
  const { user, register } = props;

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <LoginPageContainer
      topText="Already have an account?"
      topLinkUrl="/login"
      topLinkText="Login"
    >
      <Form
        title="Create an account."
        signup
        onSubmit={register}
        submitButtonText="Create"
      />
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
