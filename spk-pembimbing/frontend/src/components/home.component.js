import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    alert("Anda telah logout.");
    localStorage.setItem("loginState", "0");
  }

  render() {
    if (localStorage.getItem("loginState") === "0") {
      window.location = "/login";
    } else {
      return (
        <div className="container mt-4 text-center">
          <h3>HOME</h3>
          <div className="w-75 mx-auto">
            <div className="row mt-4">
              <div className="col-sm">
                <Link to="/input-dosen" className="nav-link">
                  <button type="button" className="btn btn-primary w-100">
                    INPUT DATA DOSEN
                  </button>
                </Link>
              </div>
              <div className="col-sm">
                <Link to="/daftar-dosen" className="nav-link">
                  <button type="button" className="btn btn-primary w-100">
                    DAFTAR DOSEN
                  </button>
                </Link>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm">
                <Link to="/edit-kriteria" className="nav-link">
                  <button
                    type="button"
                    className="btn text-light bg-warning w-100"
                  >
                    EDIT BOBOT KRITERIA
                  </button>
                </Link>
              </div>
              <div className="col-sm">
                <Link to="/rekomendasi" className="nav-link">
                  <button
                    type="button"
                    className="btn text-light bg-success w-100"
                  >
                    CARI REKOMENDASI
                  </button>
                </Link>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm">
                <Link to="/daftar-bimbingan" className="nav-link">
                  <button
                    type="button"
                    className="btn text-light bg-secondary w-100"
                  >
                    DAFTAR MAHASISWA BIMBINGAN
                  </button>
                </Link>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm">
                <Link to="/login" className="nav-link w-50 mx-auto">
                  <button
                    type="button"
                    className="btn text-light bg-danger w-100"
                    onClick={this.onLogout}
                  >
                    KELUAR
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
