import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Axios from "axios";

const API_PEMBIMBING = process.env.REACT_APP_API_PEMBIMBING;
const API_PEMBIMBING_UPDATE = process.env.REACT_APP_API_PEMBIMBING_UPDATE;
const API_BIMBINGAN = process.env.REACT_APP_API_BIMBINGAN;
const API_BIMBINGAN_DELETE = process.env.REACT_APP_API_BIMBINGAN_DELETE;
const API_STATIK = process.env.REACT_APP_API_STATIK;

const Mahasiswa = (props) => (
  <tr className="text-center">
    <td>{props.bimbingan.nama}</td>
    <td>{props.bimbingan.nim}</td>
    <td>{props.kompetensi[props.bimbingan.kompetensi]}</td>
    <td>{props.pembimbing1[0].nama}</td>
    <td>{props.pembimbing2[0].nama}</td>
    <td>
      <div className="btn-group" role="group" aria-label="Button option">
        <button
          type="button"
          className="btn btn-danger mx-1"
          onClick={() => {
            props.deleteBimbingan(
              props.bimbingan._id,
              props.pembimbing1[0],
              props.pembimbing2[0]
            );
          }}
        >
          Delete
        </button>
      </div>
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
    Axios.get(API_PEMBIMBING)
      .then((response) => {
        this.setState({ dataPembimbing: response.data });
      })
      .then(() => {
        Axios.get(API_BIMBINGAN).then((response) => {
          this.setState({ dataBimbingan: response.data });
        });
      })
      .then(() => {
        Axios.get(API_STATIK).then((response) => {
          this.setState({ kompetensi: response.data[0].kompetensi });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteBimbingan(id, idPembimbing1, idPembimbing2) {
    const data1 = {
      nik: idPembimbing1.nik,
      nama: idPembimbing1.nama,
      pendidikan: idPembimbing1.pendidikan,
      fungsional: idPembimbing1.fungsional,
      kompetensi1: idPembimbing1.kompetensi1,
      kompetensi2: idPembimbing1.kompetensi2,
      kompetensi3: idPembimbing1.kompetensi3,
      kuota: idPembimbing1.kuota - 1,
    };
    const data2 = {
      nik: idPembimbing2.nik,
      nama: idPembimbing2.nama,
      pendidikan: idPembimbing2.pendidikan,
      fungsional: idPembimbing2.fungsional,
      kompetensi1: idPembimbing2.kompetensi1,
      kompetensi2: idPembimbing2.kompetensi2,
      kompetensi3: idPembimbing2.kompetensi3,
      kuota: idPembimbing2.kuota - 1,
    };
    Axios.delete(API_BIMBINGAN_DELETE + id)
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        Axios.post(API_PEMBIMBING_UPDATE + idPembimbing1._id, data1)
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .then(() => {
        Axios.post(API_PEMBIMBING_UPDATE + idPembimbing2._id, data2).then(
          (res) => {
            console.log(res.data);
          }
        );
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
    if (localStorage.getItem("loginState" === "0")) {
      window.location = "/login";
    } else {
      return (
        <div className="container mt-4">
          <h3 className="text-center">DAFTAR MAHASISWA BIMBINGAN</h3>
          <table className="table">
            <thead className="thead-light text-center">
              <tr>
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
