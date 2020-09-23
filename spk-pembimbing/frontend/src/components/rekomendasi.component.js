import React, { Component } from "react";
import Axios from "axios";

const API_STATIK = process.env.REACT_APP_API_STATIK;

export default class Rekomendasi extends Component {
  constructor(props) {
    super(props);

    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeNim = this.onChangeNim.bind(this);
    this.onChangeKompetensi = this.onChangeKompetensi.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      statikKompetensi: [],
      nama: "",
      nim: 0,
      kompetensiIndex: 0,
    };
  }

  componentDidMount() {
    Axios.get(API_STATIK).then((response) => {
      this.setState({
        statikKompetensi: response.data[0].kompetensi,
      });
    });
  }

  focusTextInput() {
    this.textInput.current.focus();
  }

  onChangeName(event) {
    this.setState({
      nama: event.target.value,
    });
  }

  onChangeNim(event) {
    this.setState({
      nim: event.target.value,
    });
  }

  onChangeKompetensi(event) {
    this.setState({
      kompetensiIndex: event.target.selectedIndex,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    window.location =
      "/rekomendasi/hasil/" +
      this.state.nama +
      "/" +
      this.state.nim +
      "/" +
      this.state.kompetensiIndex;
  }

  render() {
    return (
      <div className="container-sm mt-4 w-50">
        <h3 className="text-center">CARI REKOMENDASI</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="nama">Nama: </label>
            <input
              type="text"
              className="form-control"
              id="nama"
              placeholder="Nama Mahasiswa"
              onChange={this.onChangeName}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nim">NIM: </label>
            <input
              type="number"
              className="form-control"
              id="nim"
              placeholder="171051001"
              onChange={this.onChangeNim}
              required
            />
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
            <button type="submit" className="btn btn-primary w-25">
              Cari
            </button>
          </div>
        </form>
      </div>
    );
  }
}
