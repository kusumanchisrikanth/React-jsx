import React from "react";
import Form from "./common/form";
import joi from "joi-browser";

class Register extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  };
  schema = {
    username: joi.string().email().required().label("Username"),
    password: joi.string().min(5).required().label("Password"),
    name: joi.string().required().label("Name"),
  };
  dosubmit = () => {
    //call server
    console.log("submitted");
  };

  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <form onSubmit={this.handlesubmit}>
          {this.renderinput("username", "Username")}
          {this.renderinput("password", "Password", "password")}
          {this.renderinput("name", "Name")}
          {this.rendersubmit("Register")}
        </form>
      </div>
    );
  }
}

export default Register;
