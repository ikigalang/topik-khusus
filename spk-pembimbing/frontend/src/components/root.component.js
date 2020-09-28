import React, { Component } from "react";
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  componentDidMount() {
    this.isLoggedIn();
  }

  isLoggedIn() {
    if (localStorage.getItem("loginState" === "1")) {
      window.location = "/home";
    } else {
      window.location = "/login";
    }
  }
  render() {
    return <div className="d-none">{this.isLoggedIn}</div>;
  }
}
