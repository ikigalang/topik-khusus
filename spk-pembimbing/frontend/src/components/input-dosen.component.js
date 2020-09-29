import React, { Component } from "react";
import Axios from "axios";

const API_STATIK = process.env.REACT_APP_API_STATIK;
const API_PEMBIMBING_ADD = process.env.REACT_APP_API_PEMBIMBING_ADD;

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
      kompetensi1: "",
      kompetensi2: "",
      kompetensi3: "",
      kuota: "",
    };
  }

  componentDidMount() {
    Axios.get(API_STATIK)
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

  onChangeKuota(event) {
    this.setState({
      kuota: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();

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

    Axios.post(API_PEMBIMBING_ADD, data)
      .then((res) => {
        console.log(res.data);
        alert("Input success!");
        window.location = "/input-dosen";
      })
      .catch((error) => console.log("Error: " + error));
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
                type="number"
                className="form-control"
                id="nik"
                placeholder="123456"
                min="0"
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
                Nilai kompetensi di bidang {this.state.statik.kompetensi[0]}:
              </label>
              <select
                ref={this.textInput}
                className="form-control"
                id="kompetensi1"
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
              <label>Kuota: </label>
              <input
                type="number"
                className="form-control"
                placeholder="0"
                min="0"
                onChange={this.onChangeKuota}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      );
    }
  }
}
