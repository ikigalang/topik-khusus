import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Axios from "axios";

const APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
const API_PEMBIMBING = process.env.REACT_APP_API_PEMBIMBING;
const API_BIMBINGAN = process.env.REACT_APP_API_BIMBINGAN;
const API_BIMBINGAN_DELETE = process.env.REACT_APP_API_BIMBINGAN_DELETE;
const API_STATIK = process.env.REACT_APP_API_STATIK;

const Mahasiswa = (props) => (
  <tr className="text-center">
    <td>{props.bimbingan.tahun}.{props.bimbingan.semester}</td>
    <td>{props.bimbingan.nama}</td>
    <td>{props.bimbingan.nim}</td>
    <td>{props.kompetensi[props.bimbingan.kompetensi]}</td>
    <td>{props.pembimbing1[0].nama}</td>
    <td>{props.pembimbing2[0].nama}</td>
    <td className="w-25">
      <button
        type="button"
        className="btn btn-danger mx-1 d-inline"
        onClick={() => {
          props.deleteBimbingan(
            props.bimbingan._id
          );
        }}
      >
        Hapus
        </button>
    </td>
  </tr>
);

export default class DaftarBimbingan extends Component {
  constructor(props) {
    super(props);

    this.deleteBimbingan = this.deleteBimbingan.bind(this);

    this.state = {
      dataPembimbing: [],
      dataBimbingan: [],
      kompetensi: [],
    };
  }

  componentDidMount() {
    Axios.get(APP_SERVER_URL + API_PEMBIMBING)
      .then((response) => {
        this.setState({ dataPembimbing: response.data });
      })
      .then(() => {
        Axios.get(APP_SERVER_URL + API_BIMBINGAN).then((response) => {
          this.setState({ dataBimbingan: response.data.filter((bimbingan) => bimbingan.status === 1) });
        });
      })
      .then(() => {
        Axios.get(APP_SERVER_URL + API_STATIK).then((response) => {
          this.setState({ kompetensi: response.data[0].kompetensi });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteBimbingan(id) {
    Axios.delete(APP_SERVER_URL + API_BIMBINGAN_DELETE + id)
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        this.setState({
          dataBimbingan: this.state.dataBimbingan.filter(
            (element) => element._id !== id
          ),
        });
      })
      .catch((error) => console.log(error));
  }

  listBimbingan() {
    return this.state.dataBimbingan.map((bimbingan) => {
      const pembimbing1 = this.state.dataPembimbing.filter(
        (element) => element._id === bimbingan.idPembimbing1
      );
      const pembimbing2 = this.state.dataPembimbing.filter(
        (element) => element._id === bimbingan.idPembimbing2
      );
      return (
        <Mahasiswa
          bimbingan={bimbingan}
          pembimbing1={pembimbing1}
          pembimbing2={pembimbing2}
          kompetensi={this.state.kompetensi}
          deleteBimbingan={this.deleteBimbingan}
          key={bimbingan._id}
        />
      );
    });
  }

  render() {
    if (localStorage.getItem("loginState") === "0") {
      window.location = "/login";
    } else {
      return (
        <div className="container mt-4">
          <h3 className="text-center">DAFTAR MAHASISWA BIMBINGAN</h3>
          <table className="table">
            <thead className="thead-light text-center">
              <tr>
                <th className="align-middle">Masa Reg.</th>
                <th className="align-middle">Nama</th>
                <th className="align-middle">NIM</th>
                <th className="align-middle">Kompetensi</th>
                <th className="align-middle">Pembimbing I</th>
                <th className="align-middle">Pembimbing II</th>
                <th className="align-middle">Opsi</th>
              </tr>
            </thead>
            <tbody>{this.listBimbingan()}</tbody>
          </table>
        </div>
      );
    }
  }
}
