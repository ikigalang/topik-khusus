import React, { Component } from "react";
import Axios from "axios";

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
    Axios.get(API_PEMBIMBING + this.props.match.params.id)
      .then((response) => {
        this.setState({
          nik: response.data.nik,
          nama: response.data.nama,
          pendidikan: response.data.pendidikan,
          fungsional: response.data.fungsional,
          kompetensi: response.data.kompetensi,
          tingkat: response.data.tingkat,
          kuota: response.data.kuota,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    Axios.get(API_STATIK)
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

    Axios.post(API_PEMBIMBING_UPDATE + this.props.match.params.id, data)
      .then((res) => {
        console.log(res.data);
        window.location = "/daftar-dosen";
      })
      .catch((error) => console.log("Error: " + error));
  }

  render() {
    return (
      <div className="container mt-4">
        <h3 className="text-center">EDIT DATA DOSEN PEMBIMBING</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="nik">NIK: </label>
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
            <label htmlFor="kompetensi">Kompetensi: </label>
            <select
              ref={this.textInput}
              className="form-control"
              id="kompetensi"
              value={this.state.kompetensi}
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
              id="tingkat"
              value={this.state.tingkat}
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
              id="kuota"
              value={this.state.kuota}
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
