import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
const API_PEMBIMBING = process.env.REACT_APP_API_PEMBIMBING;
const API_BIMBINGAN = process.env.REACT_APP_API_BIMBINGAN;
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
    <td className="w-25">
      <Link to={"/edit-dosen/" + props.dosen._id}>
        <button type="button" className="btn btn-warning mx-1 d-inline">
          Edit
          </button>
      </Link>
      <button
        type="button"
        className="btn btn-danger mx-2 d-inline"
        onClick={() => {
          props.deleteDosen(props.dosen._id);
        }}
      >
        Delete
        </button>
    </td>
  </tr>
);

export default class DaftarDosen extends Component {
  constructor(props) {
    super(props);

    this.deleteDosen = this.deleteDosen.bind(this);

    this.state = {
      dataDosen: [],
      dataBimbingan: [],
    };
  }

  componentDidMount() {
    Axios.get(APP_SERVER_URL + API_PEMBIMBING)
      .then((response) => {
        this.setState({ dataDosen: response.data });
      })
      .then(() => {
        Axios.get(APP_SERVER_URL + API_BIMBINGAN).then((response) => {
          this.setState({ dataBimbingan: response.data });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteDosen(id) {
    let free = true;
    this.state.dataBimbingan.forEach((bimbingan) => {
      if (bimbingan.idPembimbing1 === id || bimbingan.idPembimbing2 === id) {
        free = false;
      }
    });
    if (free) {
      Axios.delete(APP_SERVER_URL + API_PEMBIMBING_DELETE + id)
        .then((res) => {
          this.setState({
            dataDosen: this.state.dataDosen.filter(
              (element) => element._id !== id
            ),
          });
        })
        .catch((error) => console.log(error));
    } else {
      alert("Tidak dapat menghapus karena ada mahasiswa yang sedang bimbingan");
    }
  }

  listDosen() {
    return this.state.dataDosen.map((dosen) => {
      return (
        <Dosen dosen={dosen} deleteDosen={this.deleteDosen} key={dosen._id} />
      );
    });
  }

  render() {
    if (localStorage.getItem("loginState") === "0") {
      window.location = "/login";
    } else {
      return (
        <div className="container mt-4">
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
                <th className="align-middle">Jumlah Bimbingan</th>
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
