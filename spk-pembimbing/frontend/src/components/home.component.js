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
          <h3>MENU</h3>
          <div className="w-75 mx-auto">
            <div className="row mt-4">
              <div className="col-sm">
                <Link to="/input-dosen" className="nav-link">
                  <button type="button" className="btn btn-primary w-100">
                    <div className="m-2">
                      <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-pen" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                      </svg>
                    </div>
                    INPUT DATA DOSEN
                  </button>
                </Link>
              </div>
              <div className="col-sm">
                <Link to="/daftar-dosen" className="nav-link">
                  <button type="button" className="btn btn-info w-100">
                    <div className="m-2">
                      <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-list" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                      </svg>
                    </div>
                    DAFTAR DOSEN
                  </button>
                </Link>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm">
                <Link to="/input-mahasiswa" className="nav-link">
                  <button type="button" className="btn btn-primary w-100">
                    <div className="m-2">
                      <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-person-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                        <path fillRule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        <path fillRule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                      </svg>
                    </div>
                    INPUT DATA MAHASISWA
                  </button>
                </Link>
              </div>
              <div className="col-sm">
                <Link to="/daftar-mahasiswa" className="nav-link">
                  <button type="button" className="btn btn-info w-100">
                    <div className="m-2">
                      <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-person-lines-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7 1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm2 9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                      </svg>
                    </div>
                    DAFTAR MAHASISWA
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
                    <div className="m-2">
                      <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                      </svg>
                    </div>
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
                    <div className="m-2">
                      <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z" />
                        <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                      </svg>
                    </div>
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
                    <div className="m-2">
                      <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-person-lines-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7 1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm2 9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                      </svg>
                    </div>
                    DAFTAR MAHASISWA BIMBINGAN
                  </button>
                </Link>
              </div>
              <div className="col-sm">
                <Link to="/daftar-selesai-bimbingan" className="nav-link">
                  <button
                    type="button"
                    className="btn text-light bg-secondary w-100"
                  >
                    <div className="m-2">
                      <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-list-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z" />
                      </svg>
                    </div>
                    DAFTAR MAHASISWA SELESAI BIMBINGAN
                  </button>
                </Link>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm">
                <Link to="/login" className="nav-link">
                  <button
                    type="button"
                    className="btn text-light bg-danger w-100"
                    onClick={this.onLogout}
                  >
                    <div className="m-2">
                      <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-door-closed" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2zm1 13h8V2H4v13z" />
                        <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />
                      </svg>
                    </div>
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
