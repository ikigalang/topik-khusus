import React, { Component } from "react";
import Axios from "axios";

const APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
const API_KRITERIA = process.env.REACT_APP_API_KRITERIA;
const API_KRITERIA_UPDATE = process.env.REACT_APP_API_KRITERIA_UPDATE;
const API_STATIK = process.env.REACT_APP_API_STATIK;

export default class EditKriteria extends Component {
  constructor(props) {
    super(props);

    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);

    this.onChangePendidikan1 = this.onChangePendidikan1.bind(this);
    this.onChangeFungsional1 = this.onChangeFungsional1.bind(this);
    this.onChangeKompetensi1 = this.onChangeKompetensi1.bind(this);
    this.onChangeKuota1 = this.onChangeKuota1.bind(this);
    this.onChangePendidikan2 = this.onChangePendidikan2.bind(this);
    this.onChangeFungsional2 = this.onChangeFungsional2.bind(this);
    this.onChangeKompetensi2 = this.onChangeKompetensi2.bind(this);
    this.onChangeKuota2 = this.onChangeKuota2.bind(this);
    this.onSave = this.onSave.bind(this);

    this.state = {
      idKriteria: "",
      pembimbing1: {},
      pembimbing2: {},
      pendidikan1: 0,
      fungsional1: 0,
      kompetensi1: 0,
      kuota1: 0,
      pendidikan2: 0,
      fungsional2: 0,
      kompetensi2: 0,
      kuota2: 0,
      bobot: [],
    };
  }

  componentDidMount() {
    Axios.get(APP_SERVER_URL + API_KRITERIA).then((response) => {
      this.setState({
        idKriteria: response.data[0]._id,
        pembimbing1: response.data[0].pembimbing1,
        pembimbing2: response.data[0].pembimbing2,
        pendidikan1: response.data[0].pembimbing1.pendidikan,
        fungsional1: response.data[0].pembimbing1.fungsional,
        kompetensi1: response.data[0].pembimbing1.kompetensi,
        kuota1: response.data[0].pembimbing1.kuota,
        pendidikan2: response.data[0].pembimbing2.pendidikan,
        fungsional2: response.data[0].pembimbing2.fungsional,
        kompetensi2: response.data[0].pembimbing2.kompetensi,
        kuota2: response.data[0].pembimbing2.kuota,
      });
    });

    Axios.get(APP_SERVER_URL + API_STATIK).then((response) => {
      this.setState({
        bobot: response.data[0].bobot,
      });
    });
  }

  focusTextInput() {
    this.textInput.current.focus();
  }

  onChangePendidikan1(event) {
    this.setState({
      pendidikan1: event.target.value,
    });
  }

  onChangeFungsional1(event) {
    this.setState({
      fungsional1: event.target.value,
    });
  }

  onChangeKompetensi1(event) {
    this.setState({
      kompetensi1: event.target.value,
    });
  }

  onChangeKuota1(event) {
    this.setState({
      kuota1: event.target.value,
    });
  }

  onChangePendidikan2(event) {
    this.setState({
      pendidikan2: event.target.value,
    });
  }

  onChangeFungsional2(event) {
    this.setState({
      fungsional2: event.target.value,
    });
  }

  onChangeKompetensi2(event) {
    this.setState({
      kompetensi2: event.target.value,
    });
  }

  onChangeKuota2(event) {
    this.setState({
      kuota2: event.target.value,
    });
  }

  onSave() {
    const data = {
      pembimbing1: {
        pendidikan: this.state.pendidikan1,
        fungsional: this.state.fungsional1,
        kompetensi: this.state.kompetensi1,
        kuota: this.state.kuota1,
      },
      pembimbing2: {
        pendidikan: this.state.pendidikan2,
        fungsional: this.state.fungsional2,
        kompetensi: this.state.kompetensi2,
        kuota: this.state.kuota2,
      },
    };

    Axios.post(APP_SERVER_URL + API_KRITERIA_UPDATE + this.state.idKriteria, data)
      .then((res) => {
        console.log(res.data);
        alert("Edit success!");
        window.location = "/home";
      })
      .catch((error) => console.log(error));
  }

  render() {
    if (localStorage.getItem("loginState") === "0") {
      window.location = "/login";
    } else {
      return (
        <div className="container mt-4 text-center">
          <h3>EDIT BOBOT KRITERIA</h3>
          <div className="w-50 mx-auto">
            <h4 className="text-left mt-4">Pembimbing I</h4>
            <table className="table table-bordered">
              <thead className="thead-light text-center">
                <tr>
                  <th>Kriteria</th>
                  <th>Bobot</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td>Pendidikan</td>
                  <td className="w-25">
                    <select
                      ref={this.textInput}
                      className="form-control"
                      value={this.state.pendidikan1}
                      onChange={this.onChangePendidikan1}
                    >
                      {this.state.bobot.map((bobot) => {
                        return (
                          <option key={bobot} value={bobot}>
                            {bobot}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                </tr>
                <tr className="text-center">
                  <td>Fungsional</td>
                  <td className="w-25">
                    <select
                      ref={this.textInput}
                      className="form-control"
                      value={this.state.fungsional1}
                      onChange={this.onChangeFungsional1}
                    >
                      {this.state.bobot.map((bobot) => {
                        return (
                          <option key={bobot} value={bobot}>
                            {bobot}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                </tr>
                <tr className="text-center">
                  <td>Kompetensi</td>
                  <td className="w-25">
                    <select
                      ref={this.textInput}
                      className="form-control"
                      value={this.state.kompetensi1}
                      onChange={this.onChangeKompetensi1}
                    >
                      {this.state.bobot.map((bobot) => {
                        return (
                          <option key={bobot} value={bobot}>
                            {bobot}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                </tr>
                <tr className="text-center">
                  <td>Kuota</td>
                  <td className="w-25">
                    <select
                      ref={this.textInput}
                      className="form-control"
                      value={this.state.kuota1}
                      onChange={this.onChangeKuota1}
                    >
                      {this.state.bobot.map((bobot) => {
                        return (
                          <option key={bobot} value={bobot}>
                            {bobot}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <h4 className="text-left mt-4">Pembimbing II</h4>
            <table className="table table-bordered">
              <thead className="thead-light text-center">
                <tr>
                  <th>Kriteria</th>
                  <th>Bobot</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td>Pendidikan</td>
                  <td className="w-25">
                    <select
                      ref={this.textInput}
                      className="form-control"
                      value={this.state.pendidikan2}
                      onChange={this.onChangePendidikan2}
                    >
                      {this.state.bobot.map((bobot) => {
                        return (
                          <option key={bobot} value={bobot}>
                            {bobot}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                </tr>
                <tr className="text-center">
                  <td>Fungsional</td>
                  <td className="w-25">
                    <select
                      ref={this.textInput}
                      className="form-control"
                      value={this.state.fungsional2}
                      onChange={this.onChangeFungsional2}
                    >
                      {this.state.bobot.map((bobot) => {
                        return (
                          <option key={bobot} value={bobot}>
                            {bobot}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                </tr>
                <tr className="text-center">
                  <td>Kompetensi</td>
                  <td className="w-25">
                    <select
                      ref={this.textInput}
                      className="form-control"
                      value={this.state.kompetensi2}
                      onChange={this.onChangeKompetensi2}
                    >
                      {this.state.bobot.map((bobot) => {
                        return (
                          <option key={bobot} value={bobot}>
                            {bobot}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                </tr>
                <tr className="text-center">
                  <td>Kuota</td>
                  <td className="w-25">
                    <select
                      ref={this.textInput}
                      className="form-control"
                      value={this.state.kuota2}
                      onChange={this.onChangeKuota2}
                    >
                      {this.state.bobot.map((bobot) => {
                        return (
                          <option key={bobot} value={bobot}>
                            {bobot}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="text-right">
              <button
                type="submit"
                className="btn btn-primary w-25 mb-4"
                onClick={this.onSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}
