import React, { Component } from "react";
import axios from "axios";

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

    console.log(data);

    axios
      .post("http://localhost:8080/users/search", data)
      .then((res) =>
        res.data.status ? (window.location = "/") : console.log(res.data.status)
      )
      .catch((error) => console.log("Error: " + error));
  }

  render() {
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
              placeholder="Username"
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
              placeholder="Password"
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
