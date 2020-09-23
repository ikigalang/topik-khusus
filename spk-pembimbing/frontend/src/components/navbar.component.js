import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-primary navbar-expand-sm">
          <Link to="/" className="navbar-brand">
            Sistem Pendukung Keputusan
          </Link>
        </nav>
      </div>
    );
  }
}
