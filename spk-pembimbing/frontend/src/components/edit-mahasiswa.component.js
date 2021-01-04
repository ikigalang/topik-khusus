import React, { Component } from "react";
import Axios from "axios";

const APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
const API_STATIK = process.env.REACT_APP_API_STATIK;
const API_MAHASISWA = process.env.REACT_APP_API_MAHASISWA;
const API_MAHASISWA_SEARCH = process.env.REACT_APP_API_MAHASISWA_SEARCH;
const API_MAHASISWA_UPDATE = process.env.REACT_APP_API_MAHASISWA_UPDATE;

export default class EditDosen extends Component {
  constructor(props) {
    super(props);

    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);

    this.onChangeNim = this.onChangeNim.bind(this);
    this.onChangeNama = this.onChangeNama.bind(this);
    this.onChangeKonsentrasi = this.onChangeKonsentrasi.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nim: "",
      NewNim: "",
      nama: "",
      konsentrasi: 0,
      statikKonsentrasi: [],
    };
  }

  componentDidMount() {
    Axios.get(APP_SERVER_URL + API_MAHASISWA_SEARCH + this.props.match.params.nim)
      .then((response) => {
        this.setState({
          nim: response.data.nim,
          NewNim: response.data.nim,
          nama: response.data.nama,
          konsentrasi: response.data.konsentrasi,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    Axios.get(APP_SERVER_URL + API_STATIK).then((response) => {
      this.setState({
        statikKonsentrasi: response.data[0].kompetensi,
      });
    });
  }

  focusTextInput() {
    this.textInput.current.focus();
  }

  onChangeNim(event) {
    this.setState({
      NewNim: event.target.value,
      nim: event.target.value,
    });
  }

  onChangeNama(event) {
    this.setState({
      nama: event.target.value,
    });
  }

  onChangeKonsentrasi(event) {
    this.setState({
      konsentrasi: event.target.selectedIndex,
    });
  }

  onSubmit(event) {
    event.preventDefault();

    let isAlreadySubmitted = false;

    Axios.get(APP_SERVER_URL + API_MAHASISWA)
      .then((response) => {
        response.data.forEach((mahasiswa) => {
          if (mahasiswa.nim === this.state.NewNim) {
            if (this.state.NewNim !== this.state.nim) {
              isAlreadySubmitted = true;
            }
          }
        });
      })
      .then(() => {
        if (!isAlreadySubmitted) {
          const data = {
            nim: this.state.nim,
            nama: this.state.nama,
            konsentrasi: this.state.konsentrasi,
          };

          Axios.post(APP_SERVER_URL + API_MAHASISWA_UPDATE + this.props.match.params.id, data)
            .then((res) => {
              console.log(res.data);
              alert("Edit success!");
              window.location = "/daftar-mahasiswa";
            })
            .catch((error) => console.log("Error: " + error));
        } else {
          alert("NIM sudah digunakan.");
        }
      })
      .catch((error) => console.log(error));
  }

  render() {
    if (localStorage.getItem("loginState") === "0") {
      window.location = "/login";
    } else {
      return (
        <div className="container mt-4">
          <h3 className="text-center">EDIT DATA MAHASISWA</h3>
          <form onSubmit={this.onSubmit} className="w-50 mx-auto">
            <div className="form-group">
              <label htmlFor="nim">NIM: </label>
              <input
                type="text"
                className="form-control"
                id="nim"
                value={this.state.nim}
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
                value={this.state.nama}
                onChange={this.onChangeNama}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="konsentrasi">Konsentrasi: </label>
              <select
                ref={this.textInput}
                className="form-control"
                id="konsentrasi"
                value={this.state.statikKonsentrasi[this.state.konsentrasi]}
                onChange={this.onChangeKonsentrasi}
              >
                {this.state.statikKonsentrasi.map((konsentrasi) => {
                  return (
                    <option key={konsentrasi} value={konsentrasi}>
                      {konsentrasi}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="btn btn-primary w-25 mb-4"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      );
    }
  }
}
