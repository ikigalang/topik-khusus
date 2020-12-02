import React, { Component } from "react";
import Axios from "axios";

const APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
const API_MAHASISWA_SEARCH = process.env.REACT_APP_API_MAHASISWA_SEARCH;
const API_MAHASISWA_ADD = process.env.REACT_APP_API_MAHASISWA_ADD;

export default class InputMahasiswa extends Component {
  constructor(props) {
    super(props);

    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);

    this.onChangeNim = this.onChangeNim.bind(this);
    this.onChangeNama = this.onChangeNama.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nim: "",
      nama: "",
    };
  }

  focusTextInput() {
    this.textInput.current.focus();
  }

  onChangeNim(event) {
    this.setState({
      nim: event.target.value,
    });
  }

  onChangeNama(event) {
    this.setState({
      nama: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();

    let isAlreadySubmitted = false;

    Axios.get(APP_SERVER_URL + API_MAHASISWA_SEARCH + this.state.nim)
      .then((response) => {
        if (response.data) {
          isAlreadySubmitted = true;
        }
      })
      .then(() => {
        if (!isAlreadySubmitted) {
          const data = {
            nim: this.state.nim,
            nama: this.state.nama,
          };

          Axios.post(APP_SERVER_URL + API_MAHASISWA_ADD, data)
            .then((res) => {
              console.log(res.data);
              alert("Input success!");
              window.location = "/input-mahasiswa";
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
          <h3 className="text-center">INPUT DATA MAHASISWA</h3>
          <form onSubmit={this.onSubmit} className="w-50 mx-auto">
            <div className="form-group">
              <label htmlFor="nim">NIM: </label>
              <input
                type="text"
                className="form-control"
                id="nim"
                placeholder="123456"
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
                placeholder="Liliana"
                onChange={this.onChangeNama}
                required
              />
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="btn btn-primary w-25 mb-4"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      );
    }
  }
}
