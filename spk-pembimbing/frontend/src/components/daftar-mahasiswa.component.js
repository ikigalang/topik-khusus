import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
const API_MAHASISWA = process.env.REACT_APP_API_MAHASISWA;
const API_BIMBINGAN = process.env.REACT_APP_API_BIMBINGAN;
const API_MAHASISWA_DELETE = process.env.REACT_APP_API_MAHASISWA_DELETE;

const Mahasiswa = (props) => (
  <tr className="text-center">
    <td>{props.mahasiswa.nama}</td>
    <td>{props.mahasiswa.nim}</td>
    <td className="w-25">
      <Link to={"/edit-mahasiswa/" + props.mahasiswa.nim}>
        <button type="button" className="btn btn-warning mx-1 d-inline">
          Edit
          </button>
      </Link>
      <button
        type="button"
        className="btn btn-danger mx-2 d-inline"
        onClick={() => {
          props.deleteMahasiswa(props.mahasiswa.nim);
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

    this.deleteMahasiswa = this.deleteMahasiswa.bind(this);

    this.state = {
      dataMahasiswa: [],
      dataBimbingan: [],
    };
  }

  componentDidMount() {
    Axios.get(APP_SERVER_URL + API_MAHASISWA)
      .then((response) => {
        this.setState({ dataMahasiswa: response.data });
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

  deleteMahasiswa(nim) {
    let free = true;
    this.state.dataBimbingan.forEach((bimbingan) => {
      if (bimbingan.nim === nim) {
        free = false;
      }
    });
    if (free) {
      Axios.delete(APP_SERVER_URL + API_MAHASISWA_DELETE + nim)
        .then((res) => {
          this.setState({
            dataMahasiswa: this.state.dataMahasiswa.filter(
              (element) => element._id !== nim
            ),
          });
        })
        .catch((error) => console.log(error));
    } else {
      alert("Tidak dapat menghapus karena ada mahasiswa yang sedang bimbingan");
    }
  }

  listMahasiswa() {
    return this.state.dataMahasiswa.map((mahasiswa) => {
      return (
        <Mahasiswa mahasiswa={mahasiswa} deleteMahasiswa={this.deleteMahasiswa} key={mahasiswa.nim} />
      );
    });
  }

  render() {
    if (localStorage.getItem("loginState") === "0") {
      window.location = "/login";
    } else {
      return (
        <div className="container mt-4">
          <h3 className="text-center">DAFTAR MAHASISWA</h3>
          <table className="table">
            <thead className="thead-light text-center">
              <tr>
                <th className="align-middle">Nama</th>
                <th className="align-middle">NIM</th>
                <th className="align-middle">Opsi</th>
              </tr>
            </thead>
            <tbody>{this.listMahasiswa()}</tbody>
          </table>
        </div>
      );
    }
  }
}
