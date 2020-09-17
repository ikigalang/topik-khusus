import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
        <Link to="/" className="navbar-brand">
          Sistem Pendukung Keputusan
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/daftar-dosen" className="nav-link">
                Daftar Dosen
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/input-dosen" className="nav-link">
                Input Dosen
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/edit-dosen" className="nav-link">
                Edit Dosen
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/login" className="nav-link">
                Keluar
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
