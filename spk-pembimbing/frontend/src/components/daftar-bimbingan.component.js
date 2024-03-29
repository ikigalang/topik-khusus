import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Axios from "axios";

const APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
const API_PEMBIMBING = process.env.REACT_APP_API_PEMBIMBING;
const API_PEMBIMBING_UPDATE = process.env.REACT_APP_API_PEMBIMBING_UPDATE;
const API_BIMBINGAN = process.env.REACT_APP_API_BIMBINGAN;
const API_BIMBINGAN_UPDATE = process.env.REACT_APP_API_BIMBINGAN_UPDATE;
const API_BIMBINGAN_DELETE = process.env.REACT_APP_API_BIMBINGAN_DELETE;
const API_MAHASISWA_SEARCH = process.env.REACT_APP_API_MAHASISWA_SEARCH;
const API_STATIK = process.env.REACT_APP_API_STATIK;

const Mahasiswa = (props) => (
  <tr className="text-center">
    <td>{props.bimbingan.tahun}.{props.bimbingan.semester}</td>
    <td>{props.bimbingan.nama}</td>
    <td>{props.bimbingan.nim}</td>
    <td>{props.kompetensi[props.konsentrasi]}</td>
    <td>{props.pembimbing1[0].nama}</td>
    <td>{props.pembimbing2[0].nama}</td>
    <td className="w-25">
      <button
        type="button"
        className="btn btn-warning mx-1 d-inline"
        onClick={() => {
          props.selesaiBimbingan(
            props.bimbingan,
            props.pembimbing1[0],
            props.pembimbing2[0],
            props.bimbingan.nama
          );
        }}
      >
        Selesai
        </button>
      <button
        type="button"
        className="btn btn-danger mx-1 d-inline"
        onClick={() => {
          props.deleteBimbingan(
            props.bimbingan._id,
            props.pembimbing1[0],
            props.pembimbing2[0],
            props.bimbingan.nama
          );
        }}
      >
        Batalkan
        </button>
    </td>
  </tr>
);

export default class DaftarBimbingan extends Component {
  constructor(props) {
    super(props);

    this.deleteBimbingan = this.deleteBimbingan.bind(this);
    this.selesaiBimbingan = this.selesaiBimbingan.bind(this);
    this.onCari = this.onCari.bind(this);
    this.onChangeNim = this.onChangeNim.bind(this);
    this.onSortMreg = this.onSortMreg.bind(this);
    this.onSortNama = this.onSortNama.bind(this);
    this.onSortNim = this.onSortNim.bind(this);

    this.state = {
      dataPembimbing: [],
      dataBimbingan: [],
      kompetensi: [],
      nim: "",
      sortMreg: 0,
      sortName: 0,
      sortNim: 0
    };
  }

  componentDidMount() {
    Axios.get(APP_SERVER_URL + API_PEMBIMBING)
      .then((response) => {
        this.setState({ dataPembimbing: response.data });
      })
      .then(() => {
        Axios.get(APP_SERVER_URL + API_BIMBINGAN).then((response) => {
          this.setState({ dataBimbingan: response.data.filter((bimbingan) => bimbingan.status === 0) });
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

  onChangeNim(event) {
    this.setState({
      nim: event.target.value,
    });
  }

  onCari() {
    Axios.get(APP_SERVER_URL + API_BIMBINGAN)
      .then((response) => {
        this.setState({ dataBimbingan: response.data.filter((bimbingan) => bimbingan.status === 0 && bimbingan.nim === Number(this.state.nim)) });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  selesaiBimbingan(bimbingan, idPembimbing1, idPembimbing2, nama) {
    const data = {
      nama: bimbingan.nama,
      nim: bimbingan.nim,
      kompetensi: bimbingan.kompetensi,
      idPembimbing1: idPembimbing1._id,
      idPembimbing2: idPembimbing2._id,
      tahun: bimbingan.tahun,
      semester: bimbingan.semester,
      status: 1,
    };

    const data1 = {
      nik: idPembimbing1.nik,
      nama: idPembimbing1.nama,
      pendidikan: idPembimbing1.pendidikan,
      fungsional: idPembimbing1.fungsional,
      kompetensi1: idPembimbing1.kompetensi1,
      kompetensi2: idPembimbing1.kompetensi2,
      kompetensi3: idPembimbing1.kompetensi3,
      kuota1: idPembimbing1.kuota1 - 1,
      kuota2: idPembimbing1.kuota2,
    };
    const data2 = {
      nik: idPembimbing2.nik,
      nama: idPembimbing2.nama,
      pendidikan: idPembimbing2.pendidikan,
      fungsional: idPembimbing2.fungsional,
      kompetensi1: idPembimbing2.kompetensi1,
      kompetensi2: idPembimbing2.kompetensi2,
      kompetensi3: idPembimbing2.kompetensi3,
      kuota1: idPembimbing2.kuota1,
      kuota2: idPembimbing2.kuota2 - 1,
    };
    Axios.post(APP_SERVER_URL + API_BIMBINGAN_UPDATE + bimbingan._id, data)
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        Axios.post(APP_SERVER_URL + API_PEMBIMBING_UPDATE + idPembimbing1._id, data1)
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .then(() => {
        Axios.post(APP_SERVER_URL + API_PEMBIMBING_UPDATE + idPembimbing2._id, data2).then(
          (res) => {
            console.log(res.data);
          }
        );
      })
      .then(() => {
        this.setState({
          dataBimbingan: this.state.dataBimbingan.filter(
            (element) => element._id !== bimbingan._id
          ),
        });
        alert(nama + " telah selesai bimbingan.")
      })
      .catch((error) => console.log(error));
  }

  deleteBimbingan(id, idPembimbing1, idPembimbing2, nama) {
    const data1 = {
      nik: idPembimbing1.nik,
      nama: idPembimbing1.nama,
      pendidikan: idPembimbing1.pendidikan,
      fungsional: idPembimbing1.fungsional,
      kompetensi1: idPembimbing1.kompetensi1,
      kompetensi2: idPembimbing1.kompetensi2,
      kompetensi3: idPembimbing1.kompetensi3,
      kuota1: idPembimbing1.kuota1 - 1,
      kuota2: idPembimbing1.kuota2,
    };
    const data2 = {
      nik: idPembimbing2.nik,
      nama: idPembimbing2.nama,
      pendidikan: idPembimbing2.pendidikan,
      fungsional: idPembimbing2.fungsional,
      kompetensi1: idPembimbing2.kompetensi1,
      kompetensi2: idPembimbing2.kompetensi2,
      kompetensi3: idPembimbing2.kompetensi3,
      kuota1: idPembimbing2.kuota1 - 1,
      kuota2: idPembimbing2.kuota2,
    };

    if (window.confirm("Apakah anda yakin ingin menghapus " + nama + " dari daftar mahasiswa bimbingan?")) {
      Axios.delete(APP_SERVER_URL + API_BIMBINGAN_DELETE + id)
        .then((res) => {
          console.log(res.data);
        })
        .then(() => {
          Axios.post(APP_SERVER_URL + API_PEMBIMBING_UPDATE + idPembimbing1._id, data1)
            .then((res) => {
              console.log(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .then(() => {
          Axios.post(APP_SERVER_URL + API_PEMBIMBING_UPDATE + idPembimbing2._id, data2).then(
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
  }

  onSortMreg() {
    const dummyDataBimbingan = this.state.dataBimbingan;
    if (this.state.sortMreg === 0) {
      this.setState({
        dataBimbingan: dummyDataBimbingan.sort((a, b) => (a.tahun > b.tahun) ? 1 : (a.tahun === b.tahun) ? ((a.semester > b.semester) ? 1 : -1) : -1),
        sortMreg: 1,
        sortNim: 0,
        sortName: 0
      });
    } else {
      this.setState({
        dataBimbingan: dummyDataBimbingan.sort((a, b) => (a.tahun < b.tahun) ? 1 : (a.tahun === b.tahun) ? ((a.semester < b.semester) ? 1 : -1) : -1),
        sortMreg: 0,
        sortNim: 0,
        sortName: 0
      });
    }
  }

  onSortNama() {
    const dummyDataBimbingan = this.state.dataBimbingan;
    if (this.state.sortName === 0) {
      this.setState({
        dataBimbingan: dummyDataBimbingan.sort((a, b) => (a.nama > b.nama) ? 1 : -1),
        sortMreg: 0,
        sortName: 1,
        sortNim: 0
      });
    } else {
      this.setState({
        dataBimbingan: dummyDataBimbingan.sort((a, b) => (a.nama < b.nama) ? 1 : -1),
        sortMreg: 0,
        sortName: 0,
        sortNim: 0
      });
    }
  }

  onSortNim() {
    const dummyDataBimbingan = this.state.dataBimbingan;
    if (this.state.sortNim === 0) {
      this.setState({
        dataBimbingan: dummyDataBimbingan.sort((a, b) => (a.nim > b.nim) ? 1 : -1),
        sortMreg: 0,
        sortNim: 1,
        sortNama: 0
      });
    } else {
      this.setState({
        dataBimbingan: dummyDataBimbingan.sort((a, b) => (a.nim < b.nim) ? 1 : -1),
        sortMreg: 0,
        sortNim: 0,
        sortNama: 0
      });
    }
  }

  listBimbingan() {
    return this.state.dataBimbingan.map((bimbingan) => {
      let konsentrasi = 0;
      Axios.get(APP_SERVER_URL + API_MAHASISWA_SEARCH + bimbingan.nim)
        .then((response) => {
          konsentrasi = response.data.konsentrasi;
        })
        .catch((error) => {
          console.log(error);
        });
      const pembimbing1 = this.state.dataPembimbing.filter(
        (element) => element._id === bimbingan.idPembimbing1
      );
      const pembimbing2 = this.state.dataPembimbing.filter(
        (element) => element._id === bimbingan.idPembimbing2
      );
      return (
        <Mahasiswa
          bimbingan={bimbingan}
          konsentrasi={konsentrasi}
          pembimbing1={pembimbing1}
          pembimbing2={pembimbing2}
          kompetensi={this.state.kompetensi}
          deleteBimbingan={this.deleteBimbingan}
          selesaiBimbingan={this.selesaiBimbingan}
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
          <div className="form-group text-right m-2">
            <input className="form-control mr-sm-2 w-25 d-inline-block" type="search" placeholder="Cari berdasarkan NIM" aria-label="Search" onChange={this.onChangeNim} />
            <button className="btn btn-primary my-2 my-sm-0" type="submit" onClick={this.onCari}>Cari</button>
          </div>
          <table className="table">
            <thead className="thead-light text-center">
              <tr>
                <th className="align-middle" role="button" onClick={this.onSortMreg}>Masa Reg. {this.state.sortMreg ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                  <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                    <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                  </svg>}
                </th>
                <th className="align-middle" role="button" onClick={this.onSortNama}>Nama {this.state.sortName ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                  <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                    <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                  </svg>}
                </th>
                <th className="align-middle" role="button" onClick={this.onSortNim}>NIM {this.state.sortNim ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                  <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                    <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                  </svg>}
                </th>
                <th className="align-middle">Konsentrasi</th>
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
