import React, { Component } from "react";
import Axios from "axios";

const APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
const API_STATIK = process.env.REACT_APP_API_STATIK;
const API_PEMBIMBING_ADD = process.env.REACT_APP_API_PEMBIMBING_ADD;
const API_PEMBIMBING = process.env.REACT_APP_API_PEMBIMBING;

export default class InputDosen extends Component {
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
    this.onChangeKuota1 = this.onChangeKuota1.bind(this);
    this.onChangeKuota2 = this.onChangeKuota2.bind(this);
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
      kompetensi1: "",
      kompetensi2: "",
      kompetensi3: "",
      kuota1: "",
      kuota2: "",
    };
  }

  componentDidMount() {
    Axios.get(APP_SERVER_URL + API_STATIK)
      .then((response) => {
        this.setState({
          statik: {
            pendidikan: response.data[0].pendidikan,
            fungsional: response.data[0].fungsional,
            kompetensi: response.data[0].kompetensi,
            tingkat: response.data[0].tingkat,
          },
          pendidikan: response.data[0].pendidikan[0],
          fungsional: response.data[0].fungsional[0],
          kompetensi1: response.data[0].tingkat[0],
          kompetensi2: response.data[0].tingkat[0],
          kompetensi3: response.data[0].tingkat[0],
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

  onChangeKuota1(event) {
    this.setState({
      kuota1: event.target.value,
    });
  }

  onChangeKuota2(event) {
    this.setState({
      kuota2: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();

    let isAlreadySubmitted = false;

    Axios.get(APP_SERVER_URL + API_PEMBIMBING)
      .then((response) => {
        response.data.forEach((pembimbing) => {
          if (pembimbing.nik === Number(this.state.nik)) {
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
            kuota1: this.state.kuota1,
            kuota2: this.state.kuota2,
          };

          Axios.post(APP_SERVER_URL + API_PEMBIMBING_ADD, data)
            .then((res) => {
              console.log(res.data);
              alert("Input success!");
              window.location = "/input-dosen";
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
          <h3 className="text-center">INPUT DATA DOSEN PEMBIMBING</h3>
          <form onSubmit={this.onSubmit} className="w-50 mx-auto">
            <div className="form-group">
              <label htmlFor="nik">NIK: </label>
              <input
                type="text"
                className="form-control"
                id="nik"
                placeholder="123456"
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
                placeholder="Liliana"
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
                Tingkat kompetensi di bidang {this.state.statik.kompetensi[0]}:
              </label>
              <select
                ref={this.textInput}
                className="form-control"
                id="kompetensi1"
                onChange={this.onChangeKompetensi1}
                aria-describedby="describeKompetensi1"
              >
                {this.state.statik.tingkat.map((tingkat) => {
                  return (
                    <option key={tingkat} value={tingkat}>
                      {tingkat}
                    </option>
                  );
                })}
              </select>
              <small id="describeKompetensi1" className="form-text text-muted">
                Semakin kecil nilai semakin bagus.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="kompetensi2">
                Tingkat kompetensi di bidang {this.state.statik.kompetensi[1]}:
              </label>
              <select
                ref={this.textInput}
                className="form-control"
                id="kompetensi2"
                onChange={this.onChangeKompetensi2}
                aria-describedby="describeKompetensi2"
              >
                {this.state.statik.tingkat.map((tingkat) => {
                  return (
                    <option key={tingkat} value={tingkat}>
                      {tingkat}
                    </option>
                  );
                })}
              </select>
              <small id="describeKompetensi2" className="form-text text-muted">
                Semakin kecil nilai semakin bagus.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="kompetensi3">
                Tingkat kompetensi di bidang {this.state.statik.kompetensi[2]}:
              </label>
              <select
                ref={this.textInput}
                className="form-control"
                id="kompetensi3"
                onChange={this.onChangeKompetensi3}
                aria-describedby="describeKompetensi3"
              >
                {this.state.statik.tingkat.map((tingkat) => {
                  return (
                    <option key={tingkat} value={tingkat}>
                      {tingkat}
                    </option>
                  );
                })}
              </select>
              <small id="describeKompetensi3" className="form-text text-muted">
                Semakin kecil nilai semakin bagus.
              </small>
            </div>
            <div className="form-group">
              <label>Jumlah bimbingan saat ini (sebagai Pembimbing 1): </label>
              <input
                type="number"
                className="form-control"
                placeholder="0"
                min="0"
                onChange={this.onChangeKuota1}
                required
              />
            </div>
            <div className="form-group">
              <label>Jumlah bimbingan saat ini (sebagai Pembimbing 2): </label>
              <input
                type="number"
                className="form-control"
                placeholder="0"
                min="0"
                onChange={this.onChangeKuota2}
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
