import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const API_PEMBIMBING = process.env.REACT_APP_API_PEMBIMBING;
const API_PEMBIMBING_DELETE = process.env.REACT_APP_API_PEMBIMBING_DELETE;

const Dosen = (props) => (
  <tr className="text-center">
    <td>{props.dosen.nama}</td>
    <td>{props.dosen.nik}</td>
    <td>{props.dosen.pendidikan}</td>
    <td>{props.dosen.fungsional}</td>
    <td>{props.dosen.kompetensi1}</td>
    <td>{props.dosen.kompetensi2}</td>
    <td>{props.dosen.kompetensi3}</td>
    <td>{props.dosen.kuota}</td>
    <td>
      <div className="btn-group" role="group" aria-label="Button option">
        <Link to={"/edit-dosen/" + props.dosen._id}>
          <button type="button" className="btn btn-warning mx-1">
            Edit
          </button>
        </Link>
        <button
          type="button"
          className="btn btn-danger mx-1"
          onClick={() => {
            props.deleteDosen(props.dosen._id);
          }}
        >
          Delete
        </button>
      </div>
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
    Axios.get(API_PEMBIMBING)
      .then((response) => {
        this.setState({ dataDosen: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteDosen(id) {
    Axios.delete(API_PEMBIMBING_DELETE + id)
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
    if (localStorage.getItem("loginState" === "0")) {
      window.location = "/login";
    } else {
      return (
        <div className="px-2 mt-4">
          <h3 className="text-center">DAFTAR DOSEN PEMBIMBING</h3>
          <table className="table">
            <thead className="thead-light text-center">
              <tr>
                <th className="align-middle">Nama</th>
                <th className="align-middle">NIK</th>
                <th className="align-middle">Pendidikan</th>
                <th className="align-middle">Fungsional</th>
                <th className="align-middle">Kompetensi I</th>
                <th className="align-middle">Kompetensi II</th>
                <th className="align-middle">Kompetensi III</th>
                <th className="align-middle">Kuota</th>
                <th className="align-middle">Opsi</th>
              </tr>
            </thead>
            <tbody>{this.listDosen()}</tbody>
          </table>
        </div>
      );
    }
  }
}
