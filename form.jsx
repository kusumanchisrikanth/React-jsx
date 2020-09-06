import React, { Component } from "react";
import joi from "joi-browser";
import Input from "./Input";
import Select from "./select";
class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  validate = () => {
    const options = {
      abortEarly: false,
    };
    const { error } = joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;

    //   console.log(result);
    //   const { data } = this.state;
    //   const errors = {};
    //   if (data.username.trim() === "") errors.username = "Username required";
    //   if (data.password.trim() === "") errors.password = "Password required";
    //   return Object.keys(errors).length === 0 ? null : errors;
  };
  validateproperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = joi.validate(obj, schema);
    return error ? error.details[0].message : null;

    // if (name === "username") {
    //   if (value.trim() === "") return "Username required";
    //   //......
    // }
    // if (name === "password") {
    //   if (value.trim() === "") return "Password required";
    //   //......
  };
  handlesubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    //console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.dosubmit();
  };
  handlechange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errormessage = this.validateproperty(input);
    if (errormessage) errors[input.name] = errormessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  rendersubmit(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }
  renderinput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        value={data[name]}
        name={name}
        type={type}
        autoComplete={name}
        onChange={this.handlechange}
        label={label}
        error={errors[name]}
      />
    );
  }
  renderselect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        value={data[name]}
        name={name}
        options={options}
        autoComplete={name}
        onChange={this.handlechange}
        label={label}
        error={errors[name]}
      />
    );
  }
}

export default Form;
