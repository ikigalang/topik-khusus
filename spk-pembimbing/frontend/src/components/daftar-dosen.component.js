import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const Dosen = (props) => (
  <tr>
    <td>{props.dosen.nama}</td>
    <td>{props.dosen.nik}</td>
    <td>{props.dosen.pendidikan}</td>
    <td>{props.dosen.fungsional}</td>
    <td>{props.dosen.kompetensi}</td>
    <td>{props.dosen.tingkat}</td>
    <td>{props.dosen.kuota}</td>
    <td>
      <Link to={"/edit-dosen/" + props.dosen._id}>Edit</Link>|
      <a
        href="#"
        onClick={() => {
          props.deleteDosen(props.dosen._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

export default class DaftarDosen extends Component {
  constructor(props) {
    super(props);

    this.deleteDosen = this.deleteDosen.bind(this);

    this.state = { dataDosen: [] };
  }

  componentDidMount() {
    Axios.get("http://localhost:8080/pembimbing/")
      .then((response) => {
        this.setState({ dataDosen: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteDosen(id) {
    Axios.delete("http://localhost:8080/pembimbing/delete/" + id)
      .then((res) => {
        console.log(res.data);
        this.setState({
          dataDosen: this.state.dataDosen.filter(
            (element) => element._id !== id
          ),
        });
      })
      .catch((error) => console.log(error));
  }

  listDosen() {
    return this.state.dataDosen.map((dosen) => {
      return (
        <Dosen dosen={dosen} deleteDosen={this.deleteDosen} key={dosen._id} />
      );
    });
  }

  render() {
    return (
      <div className="container">
        <h3 className="text-center">DAFTAR DOSEN PEMBIMBING</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Nama</th>
              <th>NIK</th>
              <th>Pendidikan</th>
              <th>Fungsional</th>
              <th>Kompetensi</th>
              <th>Tingkat</th>
              <th>Kuota</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>{this.listDosen()}</tbody>
        </table>
      </div>
    );
  }
}
