import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div className="container mt-4 text-center">
        <h3>EDIT DATA DOSEN PEMBIMBING</h3>
        <div className="row mt-5">
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
            <Link to="/#" className="nav-link">
              <button type="button" className="btn text-light bg-warning w-100">
                EDIT BOBOT KRITERIA
              </button>
            </Link>
          </div>
          <div className="col-sm">
            <Link to="/#" className="nav-link">
              <button type="button" className="btn text-light bg-success w-100">
                CARI REKOMENDASI
              </button>
            </Link>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-sm">
            <Link to="/#" className="nav-link">
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
              <button type="button" className="btn text-light bg-danger w-100">
                KELUAR
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
