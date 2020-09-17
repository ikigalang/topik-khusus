import React, { Component } from "react";

export default class InputDosen extends Component {
  constructor(props) {
    super(props);

    this.onChangeNik = this.onChangeNik.bind(this);
    this.onChangeNama = this.onChangeNama.bind(this);
    this.onChangePendidikan = this.onChangePendidikan.bind(this);
    this.onChangeFungsional = this.onChangeFungsional.bind(this);
    this.onChangeKompetensi = this.onChangeKompetensi.bind(this);
    this.onChangeKuota = this.onChangeKuota.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nik: "",
      nama: "",
      pendidikan: [],
      fungsional: [],
      kompetensi: [],
      tingkat: [],
      kuota: "",
    };
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
  }

  componentDidMount() {
    this.setState({
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
      tingkat: [
        "Tingkat 1",
        "Tingkat 2",
        "Tingkat 3",
        "Tingkat 4",
        "Tingkat 5",
        "Tingkat 6",
      ],
    });
  }

  render() {
    return (
      <div className="container">
        <h3 className="text-center">Input Data Dosen</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label for="nik">NIK: </label>
            <input
              type="number"
              className="form-control"
              id="nik"
              value={this.state.nik}
              onChange={this.onChangeNik}
              required
            />
          </div>
          <div className="fomr-group">
            <label for="nama">Nama: </label>
            <input
              type="text"
              className="form-control"
              id="nama"
              value={this.state.username}
              onChange={this.onChangeNama}
              required
            />
          </div>
          <div className="form-group">
            <label for="pendidikan">Pendidikan: </label>
            <select
              ref="userInput"
              className="form-control"
              id="pendidikan"
              value={this.state.pendidikan}
              onChange={this.onChangePendidikan}
            >
              {this.state.pendidikan.map((tingkat) => {
                return (
                  <option key={tingkat} value={tingkat}>
                    {tingkat}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label for="fungsional">Fungsional: </label>
            <select
              ref="userInput"
              className="form-control"
              id="fungsional"
              value={this.state.fungsional}
              onChange={this.onChangeFungsional}
            >
              {this.state.fungsional.map((tingkat) => {
                return (
                  <option key={tingkat} value={tingkat}>
                    {tingkat}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label for="kompetensi">Kompetensi: </label>
            <select
              ref="userInput"
              className="form-control"
              value={this.state.kompetensi}
              onChange={this.onChangeKompetensi}
            >
              {this.state.kompetensi.map((tingkat) => {
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
              ref="userInput"
              className="form-control"
              value={this.state.tingkat}
              onChange={this.onChangeTingkat}
            >
              {this.state.tingkat.map((nilai) => {
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
              value={this.state.kuota}
              onChange={this.onChangeKuota}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
