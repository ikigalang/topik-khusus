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
    <td>{props.dosen.kuota1}</td>
    <td>{props.dosen.kuota2}</td>
    <td>
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
    this.onCari = this.onCari.bind(this);
    this.onChangeNik = this.onChangeNik.bind(this);
    this.onSortNama = this.onSortNama.bind(this);
    this.onSortNik = this.onSortNik.bind(this);

    this.state = {
      dataDosen: [],
      dataBimbingan: [],
      sortName: 0,
      sortNik: 0
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

  onChangeNik(event) {
    this.setState({
      nik: event.target.value,
    });
  }

  onCari() {
    Axios.get(APP_SERVER_URL + API_PEMBIMBING)
      .then((response) => {
        this.setState({ dataDosen: response.data.filter((dosen) => dosen.nik === Number(this.state.nik)) });
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
    const dummyDataDosen = this.state.dataDosen;
    if (this.state.sortName === 0) {
      this.setState({
        dataMahasiswa: dummyDataDosen.sort((a, b) => (a.nama > b.nama) ? 1 : -1),
        sortName: 1,
        sortNik: 0
      });
    } else {
      this.setState({
        dataMahasiswa: dummyDataDosen.sort((a, b) => (a.nama < b.nama) ? 1 : -1),
        sortName: 0,
        sortNik: 0
      });
    }
  }

  onSortNik() {
    const dummyDataDosen = this.state.dataDosen;
    if (this.state.sortNik === 0) {
      this.setState({
        dataMahasiswa: dummyDataDosen.sort((a, b) => (a.nik > b.nik) ? 1 : -1),
        sortNik: 1,
        sortName: 0
      });
    } else {
      this.setState({
        dataMahasiswa: dummyDataDosen.sort((a, b) => (a.nik < b.nik) ? 1 : -1),
        sortNik: 0,
        sortName: 0
      });
    }
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
        <div className="container-fluid mt-4">
          <h3 className="text-center">DAFTAR DOSEN PEMBIMBING</h3>
          <div className="form-group text-right m-2">
            <input className="form-control mr-sm-2 w-25 d-inline-block" type="search" placeholder="Cari berdasarkan NIK" aria-label="Search" onChange={this.onChangeNik} />
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
                <th className="align-middle" role="button" onClick={this.onSortNik}>NIK {this.state.sortNik ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                  <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                    <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                  </svg>}
                </th>
                <th className="align-middle">Pendidikan</th>
                <th className="align-middle">Fungsional</th>
                <th className="align-middle">STI</th>
                <th className="align-middle">SKC</th>
                <th className="align-middle">JARKOM</th>
                <th className="align-middle">Jumlah Bimbingan 1</th>
                <th className="align-middle">Jumlah Bimbingan 2</th>
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
