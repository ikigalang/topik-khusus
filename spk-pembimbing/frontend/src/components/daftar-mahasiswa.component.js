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
    this.onCari = this.onCari.bind(this);
    this.onChangeNim = this.onChangeNim.bind(this);
    this.onSortNama = this.onSortNama.bind(this);
    this.onSortNim = this.onSortNim.bind(this);

    this.state = {
      dataMahasiswa: [],
      dataBimbingan: [],
      nim: "",
      sortName: 0,
      sortNim: 0
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

  onChangeNim(event) {
    this.setState({
      nim: event.target.value,
    });
  }

  onCari() {
    Axios.get(APP_SERVER_URL + API_MAHASISWA)
      .then((response) => {
        this.setState({ dataMahasiswa: response.data.filter((mahasiswa) => mahasiswa.nim === Number(this.state.nim)) });
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

  onSortNama() {
    const dummyDataMahasiswa = this.state.dataMahasiswa;
    if (this.state.sortName === 0) {
      this.setState({
        dataMahasiswa: dummyDataMahasiswa.sort((a, b) => (a.nama > b.nama) ? 1 : -1),
        sortName: 1,
        sortNim: 0
      });
    } else {
      this.setState({
        dataMahasiswa: dummyDataMahasiswa.sort((a, b) => (a.nama < b.nama) ? 1 : -1),
        sortName: 0,
        sortNim: 0
      });
    }
  }

  onSortNim() {
    const dummyDataMahasiswa = this.state.dataMahasiswa;
    if (this.state.sortNim === 0) {
      this.setState({
        dataMahasiswa: dummyDataMahasiswa.sort((a, b) => (a.nim > b.nim) ? 1 : -1),
        sortNim: 1,
        sortNama: 0
      });
    } else {
      this.setState({
        dataMahasiswa: dummyDataMahasiswa.sort((a, b) => (a.nim < b.nim) ? 1 : -1),
        sortNim: 0,
        sortNama: 0
      });
    }
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
          <div className="form-group text-right m-2">
            <input className="form-control mr-sm-2 w-25 d-inline-block" type="search" placeholder="Cari berdasarkan NIM" aria-label="Search" onChange={this.onChangeNim} />
            <button className="btn btn-primary my-2 my-sm-0" type="submit" onClick={this.onCari}>Cari</button>
          </div>
          <table className="table">
            <thead className="thead-light text-center">
              <tr>
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
                <th className="align-middle">Opsi</th>
              </tr>
            </thead>
            <tbody>{this.listMahasiswa()}</tbody>
          </table>
        </div >
      );
    }
  }
}
