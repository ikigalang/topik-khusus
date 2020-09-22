import React, { Component } from "react";
import Axios from "axios";

const API_KRITERIA = process.env.REACT_APP_API_KRITERIA;
const API_KRITERIA_UPDATE = process.env.REACT_APP_API_KRITERIA_UPDATE;

export default class EditKriteria extends Component {
  constructor(props) {
    super(props);

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
      pendidikan1: "",
      fungsional1: "",
      kompetensi1: "",
      kuota1: "",
      pendidikan2: "",
      fungsional2: "",
      kompetensi2: "",
      kuota2: "",
    };
  }

  componentDidMount() {
    Axios.get(API_KRITERIA).then((response) => {
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

    console.log(data);

    Axios.post(API_KRITERIA_UPDATE + this.state.idKriteria, data)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="container mt-4 text-center">
        <h3>EDIT BOBOT KRITERIA</h3>
        <h4 className="text-left mt-4">Pembimbing I</h4>
        <table className="table table-bordered">
          <thead className="thead-light text-center">
            <tr>
              <th>Kriteria</th>
              <th>Bobot (1-100)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td>Pendidikan</td>
              <td className="w-25">
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  onChange={this.onChangePendidikan1}
                  placeholder={this.state.pembimbing1.pendidikan}
                ></input>
              </td>
            </tr>
            <tr className="text-center">
              <td>Fungsional</td>
              <td className="w-25">
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  onChange={this.onChangeFungsional1}
                  placeholder={this.state.pembimbing1.fungsional}
                ></input>
              </td>
            </tr>
            <tr className="text-center">
              <td>Kompetensi</td>
              <td className="w-25">
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  onChange={this.onChangeKompetensi1}
                  placeholder={this.state.pembimbing1.kompetensi}
                ></input>
              </td>
            </tr>
            <tr className="text-center">
              <td>Kuota</td>
              <td className="w-25">
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  onChange={this.onChangeKuota1}
                  placeholder={this.state.pembimbing1.kuota}
                ></input>
              </td>
            </tr>
          </tbody>
        </table>
        <h4 className="text-left mt-4">Pembimbing II</h4>
        <table className="table table-bordered">
          <thead className="thead-light text-center">
            <tr>
              <th>Kriteria</th>
              <th>Bobot (1-100)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td>Pendidikan</td>
              <td className="w-25">
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  onChange={this.onChangePendidikan2}
                  placeholder={this.state.pembimbing2.pendidikan}
                ></input>
              </td>
            </tr>
            <tr className="text-center">
              <td>Fungsional</td>
              <td className="w-25">
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  onChange={this.onChangeFungsional2}
                  placeholder={this.state.pembimbing2.fungsional}
                ></input>
              </td>
            </tr>
            <tr className="text-center">
              <td>Kompetensi</td>
              <td className="w-25">
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  onChange={this.onChangeKompetensi2}
                  placeholder={this.state.pembimbing2.kompetensi}
                ></input>
              </td>
            </tr>
            <tr className="text-center">
              <td>Kuota</td>
              <td className="w-25">
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  onChange={this.onChangeKuota2}
                  placeholder={this.state.pembimbing2.kuota}
                ></input>
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
    );
  }
}
