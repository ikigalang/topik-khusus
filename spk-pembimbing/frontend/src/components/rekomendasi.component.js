import React, { Component } from "react";
import Axios from "axios";

const APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
const API_STATIK = process.env.REACT_APP_API_STATIK;
const API_BIMBINGAN = process.env.REACT_APP_API_BIMBINGAN;
const API_MAHASISWA_SEARCH = process.env.REACT_APP_API_MAHASISWA_SEARCH;

export default class Rekomendasi extends Component {
  constructor(props) {
    super(props);

    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeNim = this.onChangeNim.bind(this);
    this.onChangeTahun = this.onChangeTahun.bind(this);
    this.onChangeSemester = this.onChangeSemester.bind(this);
    this.onChangeKompetensi = this.onChangeKompetensi.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      statikKompetensi: [],
      nama: "Masukkan NIM",
      nim: 0,
      tahun: 0,
      semester: 1,
      kompetensiIndex: 0,
      disabled: true
    };
  }

  componentDidMount() {
    Axios.get(APP_SERVER_URL + API_STATIK).then((response) => {
      this.setState({
        statikKompetensi: response.data[0].kompetensi,
      });
    });
  }

  focusTextInput() {
    this.textInput.current.focus();
  }

  onChangeNim(event) {
    Axios.get(APP_SERVER_URL + API_MAHASISWA_SEARCH + event.target.value)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          this.setState({
            nama: response.data.nama,
            disabled: false
          });
        } else {
          this.setState({
            nama: "NIM tidak ditemukan",
            disabled: true
          });
        }
      })
      .catch((error) => console.log(error));
    this.setState({
      nim: event.target.value,
    });
  }

  onChangeTahun(event) {
    this.setState({
      tahun: event.target.value,
    });
  }

  onChangeSemester(event) {
    this.setState({
      semester: event.target.value,
    });
  }

  onChangeKompetensi(event) {
    this.setState({
      kompetensiIndex: event.target.selectedIndex,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    // validasi nim

    let isAlreadySubmitted = false;

    Axios.get(APP_SERVER_URL + API_BIMBINGAN)
      .then((response) => {
        response.data.forEach((bimbingan) => {
          if (bimbingan.nim === Number(this.state.nim)) {
            isAlreadySubmitted = true;
          }
        });
      })
      .then(() => {
        if (!isAlreadySubmitted) {
          window.location =
            "/rekomendasi/hasil/" +
            this.state.nama +
            "/" +
            this.state.nim +
            "/" +
            this.state.kompetensiIndex +
            "/" +
            this.state.semester +
            "/" +
            this.state.tahun;
        } else {
          alert("NIM sudah digunakan.");
        }
      });
  }

  render() {
    if (localStorage.getItem("loginState") === "0") {
      window.location = "/login";
    } else {
      return (
        <div className="container-sm mt-4">
          <h3 className="text-center">CARI REKOMENDASI</h3>
          <form onSubmit={this.onSubmit} className="w-50 mx-auto">
            <div className="form-group">
              <label htmlFor="nim">NIM: </label>
              <input
                type="number"
                className="form-control"
                id="nim"
                min="0"
                placeholder="171051001"
                onChange={this.onChangeNim}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="nama">Nama: </label>
              <input
                type="text"
                className="form-control"
                id="nama"
                placeholder={this.state.nama}
                readOnly
              />
            </div>
            <div className="form-row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="tahun">Tahun: </label>
                  <input
                    type="number"
                    className="form-control"
                    id="tahun"
                    min="0"
                    placeholder="2020"
                    onChange={this.onChangeTahun}
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="semester">Semester: </label>
                  <select id="semester" className="form-control" onChange={this.onChangeSemester}
                    required>
                    <option defaultValue>1</option>
                    <option>2</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="kompetensi">Kompetensi: </label>
              <select
                ref={this.textInput}
                className="form-control"
                id="kompetensi"
                onChange={this.onChangeKompetensi}
              >
                {this.state.statikKompetensi.map((kompetensi) => {
                  return (
                    <option key={kompetensi} value={kompetensi}>
                      {kompetensi}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group text-right">
              <button type="submit" className="btn btn-primary w-25" disabled={this.state.disabled}>
                Cari
              </button>
            </div>
          </form>
        </div>
      );
    }
  }
}
