import React, { Component } from "react";
import Axios from "axios";

const APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
const API_PEMBIMBING = process.env.REACT_APP_API_PEMBIMBING;
const API_PEMBIMBING_UPDATE = process.env.REACT_APP_API_PEMBIMBING_UPDATE;
const API_STATIK = process.env.REACT_APP_API_STATIK;

export default class EditDosen extends Component {
  constructor(props) {
    super(props);

    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);

    this.onChangeNik = this.onChangeNik.bind(this);
    this.onChangeNama = this.onChangeNama.bind(this);
    this.onChangePendidikan = this.onChangePendidikan.bind(this);
    this.onChangeFungsional = this.onChangeFungsional.bind(this);
    this.onChangeKompetensi1 = this.onChangeKompetensi1.bind(this);
    this.onChangeKompetensi2 = this.onChangeKompetensi2.bind(this);
    this.onChangeKompetensi3 = this.onChangeKompetensi3.bind(this);
    this.onChangeKuota = this.onChangeKuota.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      statik: {
        pendidikan: [],
        fungsional: [],
        kompetensi: [],
        tingkat: [],
      },
      nik: "",
      nama: "",
      pendidikan: "",
      fungsional: "",
      kompetensi1: 0,
      kompetensi2: 0,
      kompetensi3: 0,
      kuota: "",
    };
  }

  componentDidMount() {
    Axios.get(APP_SERVER_URL + API_PEMBIMBING + this.props.match.params.id)
      .then((response) => {
        this.setState({
          nik: response.data.nik,
          nama: response.data.nama,
          pendidikan: response.data.pendidikan,
          fungsional: response.data.fungsional,
          kompetensi1: response.data.kompetensi1,
          kompetensi2: response.data.kompetensi2,
          kompetensi3: response.data.kompetensi3,
          kuota: response.data.kuota,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    Axios.get(APP_SERVER_URL + API_STATIK)
      .then((response) => {
        this.setState({
          statik: {
            pendidikan: response.data[0].pendidikan,
            fungsional: response.data[0].fungsional,
            kompetensi: response.data[0].kompetensi,
            tingkat: response.data[0].tingkat,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  focusTextInput() {
    this.textInput.current.focus();
  }

  onChangeNik(event) {
    this.setState({
      nik: event.target.value,
    });
  }

  onChangeNama(event) {
    this.setState({
      nama: event.target.value,
    });
  }

  onChangePendidikan(event) {
    this.setState({
      pendidikan: event.target.value,
    });
  }

  onChangeFungsional(event) {
    this.setState({
      fungsional: event.target.value,
    });
  }

  onChangeKompetensi1(event) {
    this.setState({
      kompetensi1: event.target.value,
    });
  }

  onChangeKompetensi2(event) {
    this.setState({
      kompetensi2: event.target.value,
    });
  }

  onChangeKompetensi3(event) {
    this.setState({
      kompetensi3: event.target.value,
    });
  }

  onChangeKuota(event) {
    this.setState({
      kuota: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();

    let isAlreadySubmitted = false;

    Axios.get(APP_SERVER_URL + API_PEMBIMBING)
      .then((response) => {
        response.data.forEach((pembimbing) => {
          if (pembimbing.nik === this.state.nik) {
            isAlreadySubmitted = true;
          }
        });
      })
      .then(() => {
        if (!isAlreadySubmitted) {
          const data = {
            nik: this.state.nik,
            nama: this.state.nama,
            pendidikan: this.state.pendidikan,
            fungsional: this.state.fungsional,
            kompetensi1: this.state.kompetensi1,
            kompetensi2: this.state.kompetensi2,
            kompetensi3: this.state.kompetensi3,
            kuota: this.state.kuota,
          };

          Axios.post(APP_SERVER_URL + API_PEMBIMBING_UPDATE + this.props.match.params.id, data)
            .then((res) => {
              console.log(res.data);
              alert("Edit success!");
              window.location = "/daftar-dosen";
            })
            .catch((error) => console.log("Error: " + error));
        } else {
          alert("NIK sudah digunakan.");
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
          <h3 className="text-center">EDIT DATA DOSEN PEMBIMBING</h3>
          <form onSubmit={this.onSubmit} className="w-50 mx-auto">
            <div className="form-group">
              <label htmlFor="nik">NIK: </label>
              <input
                type="text"
                className="form-control"
                id="nik"
                value={this.state.nik}
                onChange={this.onChangeNik}
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
              <label htmlFor="pendidikan">Pendidikan: </label>
              <select
                ref={this.textInput}
                className="form-control"
                id="pendidikan"
                value={this.state.pendidikan}
                onChange={this.onChangePendidikan}
              >
                {this.state.statik.pendidikan.map((tingkat) => {
                  return (
                    <option key={tingkat} value={tingkat}>
                      {tingkat}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="fungsional">Fungsional: </label>
              <select
                ref={this.textInput}
                className="form-control"
                id="fungsional"
                value={this.state.fungsional}
                onChange={this.onChangeFungsional}
              >
                {this.state.statik.fungsional.map((tingkat) => {
                  return (
                    <option key={tingkat} value={tingkat}>
                      {tingkat}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="kompetensi1">
                Nilai kompetensi di bidang {this.state.statik.kompetensi[0]}:
              </label>
              <select
                ref={this.textInput}
                className="form-control"
                id="kompetensi1"
                value={this.state.kompetensi1}
                onChange={this.onChangeKompetensi1}
              >
                {this.state.statik.tingkat.map((tingkat) => {
                  return (
                    <option key={tingkat} value={tingkat}>
                      {tingkat}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="kompetensi2">
                Nilai kompetensi di bidang {this.state.statik.kompetensi[1]}:
              </label>
              <select
                ref={this.textInput}
                className="form-control"
                id="kompetensi2"
                value={this.state.kompetensi2}
                onChange={this.onChangeKompetensi2}
              >
                {this.state.statik.tingkat.map((tingkat) => {
                  return (
                    <option key={tingkat} value={tingkat}>
                      {tingkat}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="kompetensi3">
                Nilai kompetensi di bidang {this.state.statik.kompetensi[2]}:
              </label>
              <select
                ref={this.textInput}
                className="form-control"
                id="kompetensi3"
                value={this.state.kompetensi3}
                onChange={this.onChangeKompetensi3}
              >
                {this.state.statik.tingkat.map((tingkat) => {
                  return (
                    <option key={tingkat} value={tingkat}>
                      {tingkat}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Jumlah bimbingan saat ini: </label>
              <input
                type="number"
                className="form-control"
                id="kuota"
                min="0"
                value={this.state.kuota}
                onChange={this.onChangeKuota}
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
