import React, { Component } from "react";
import Axios from "axios";

export default class InputDosen extends Component {
  constructor(props) {
    super(props);

    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);

    this.onChangeNik = this.onChangeNik.bind(this);
    this.onChangeNama = this.onChangeNama.bind(this);
    this.onChangePendidikan = this.onChangePendidikan.bind(this);
    this.onChangeFungsional = this.onChangeFungsional.bind(this);
    this.onChangeKompetensi = this.onChangeKompetensi.bind(this);
    this.onChangeTingkat = this.onChangeTingkat.bind(this);
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
      kompetensi: "",
      tingkat: "",
      kuota: "",
    };
  }

  componentDidMount() {
    this.setState({
      statik: {
        pendidikan: ["S2", "S3"],
        fungsional: [
          "Tenaga Pengajar",
          "Asisten Ahli",
          "Lektor",
          "Lektor Kepala",
          "Guru Besar",
        ],
        kompetensi: [
          "Sistem dan Teknologi Informasi",
          "Sistem dan Komputasi Cerdas",
          "Jaringan Komputer",
        ],
        tingkat: ["1", "2", "3", "4", "5", "6"],
      },
      pendidikan: "S2",
      fungsional: "Tenaga Pengajar",
      kompetensi: "Sistem dan Teknologi Informasi",
      tingkat: "1",
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

  onChangeKompetensi(event) {
    this.setState({
      kompetensi: event.target.value,
    });
  }

  onChangeTingkat(event) {
    this.setState({
      tingkat: event.target.value,
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
      kompetensi: this.state.kompetensi,
      tingkat: this.state.tingkat,
      kuota: this.state.kuota,
    };

    Axios.post("http://localhost:8080/pembimbing/add", data)
      .then((res) => console.log(res.data))
      .catch((error) => console.log("Error: " + error));

    console.log(this.state);
  }

  render() {
    return (
      <div className="container">
        <h3 className="text-center">INPUT DATA DOSEN PEMBIMBING</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="nik">NIK: </label>
            <input
              type="number"
              className="form-control"
              id="nik"
              placeholder="123456"
              onChange={this.onChangeNik}
              required
            />
          </div>
          <div className="fomr-group">
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
            <label htmlFor="kompetensi">Kompetensi: </label>
            <select
              ref={this.textInput}
              className="form-control"
              onChange={this.onChangeKompetensi}
            >
              {this.state.statik.kompetensi.map((tingkat) => {
                return (
                  <option key={tingkat} value={tingkat}>
                    {tingkat}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Tingkat: </label>
            <select
              ref={this.textInput}
              className="form-control"
              onChange={this.onChangeTingkat}
            >
              {this.state.statik.tingkat.map((nilai) => {
                return (
                  <option key={nilai} value={nilai}>
                    {nilai}
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
