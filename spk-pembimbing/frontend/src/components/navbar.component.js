import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    let address = "/home";
    if (localStorage.getItem("loginState") === "0") {
      address = "/login";
    }
    return (
      <div>
        <nav className="navbar navbar-dark bg-primary navbar-expand-sm">
          <Link to={address} className="navbar-brand">
            Sistem Pendukung Keputusan
          </Link>
        </nav>
      </div>
    );
  }
}
