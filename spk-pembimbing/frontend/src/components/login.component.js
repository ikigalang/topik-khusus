import React, { Component } from "react";
import axios from "axios";

const API_USER_SEARCH = process.env.REACT_APP_API_USER_SEARCH;

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      password: "",
    };
  }

  focusTextInput() {
    this.textInput.current.focus();
  }

  onChangeUsername(event) {
    this.setState({
      username: event.target.value,
    });
  }

  onChangePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const data = {
      username: this.state.username,
      password: this.state.password,
    };

    axios
      .post(API_USER_SEARCH, data)
      .then((res) => {
        if (res.data.status) {
          localStorage.setItem("loginState", "1");
          window.location = "/home";
        } else {
          alert("Username/password wrong!");
          this.setState({
            username: "",
            password: "",
          });
        }
      })
      .catch((error) => console.log("Error: " + error));
  }

  render() {
    if (localStorage.getItem("loginState") === "1") {
      window.location = "/home";
    } else {
      return (
        <div className="container-sm mt-4">
          <h3 className="text-center">LOGIN</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      );
    }
  }
}
