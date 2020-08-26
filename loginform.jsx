import React, { Component } from "react";
import joi from "joi-browser";
import Input from "./common/Input";
class Login extends Component {
  state = {
    account: {
      username: "",
      password: "",
    },
    errors: {},
  };
  schema = {
    username: joi.string().required(),
    password: joi.string().required(),
  };
  validate = () => {
    const result = joi.validate(this.state.account, this.schema, {
      abortEarly: false,
    });
    console.log(result);
    const { account } = this.state;
    const errors = {};
    if (account.username.trim() === "") errors.username = "Username required";
    if (account.password.trim() === "") errors.password = "Password required";
    return Object.keys(errors).length === 0 ? null : errors;
  };
  validateproperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username required";
      //......
    }
    if (name === "password") {
      if (value.trim() === "") return "Password required";
      //......
    }
  };

  handlesubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    //console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;
    //call server
    console.log("submitted");
  };
  handlechange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errormessage = this.validateproperty(input);
    if (errormessage) errors[input.name] = errormessage;
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };
  render() {
    const { username, password } = this.state.account;
    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={this.handlesubmit}>
          <Input
            value={username}
            name="username"
            type="text"
            autoComplete="username"
            onChange={this.handlechange}
            label="Username"
            error={this.state.errors.username}
          />
          <Input
            value={password}
            name="password"
            type="password"
            autoComplete="current-password"
            onChange={this.handlechange}
            label="Password"
            error={this.state.errors.password}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
