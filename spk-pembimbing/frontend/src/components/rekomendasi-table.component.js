import React, { Component } from "react";
import Axios from "axios";

const APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
const API_STATIK = process.env.REACT_APP_API_STATIK;
const API_PEMBIMBING = process.env.REACT_APP_API_PEMBIMBING;
const API_PEMBIMBING_UPDATE = process.env.REACT_APP_API_PEMBIMBING_UPDATE;
const API_KRITERIA = process.env.REACT_APP_API_KRITERIA;
const API_BIMBINGAN_ADD = process.env.REACT_APP_API_BIMBINGAN_ADD;

const Dosen = (props) => (
  <tr className="text-center">
    <td className="align-middle">{props.dosen.nama}</td>
    <td className="align-middle">{props.dosen.nik}</td>
    <td className="align-middle">{props.dosen.pendidikan}</td>
    <td className="align-middle">{props.dosen.fungsional}</td>
    <td className="align-middle">{props.dosen.kompetensi1}</td>
    <td className="align-middle">{props.dosen.kompetensi2}</td>
    <td className="align-middle">{props.dosen.kompetensi3}</td>
    <td className="align-middle bg-light"><p className="font-weight-bold">{props.kuota}</p></td>
    <td className="align-middle">{props.score}</td>
    <td className="align-middle">{props.button}</td>
  </tr>
);

export default class RekomendasiTable extends Component {
  constructor(props) {
    super(props);

    this.pembimbing1 = this.pembimbing1.bind(this);
    this.pembimbing2 = this.pembimbing2.bind(this);
    this.onSelected = this.onSelected.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onSave = this.onSave.bind(this);

    this.state = {
      kriteria: {},
      konsentrasi: "Loading...",
      statikKonsentrasi: [],
      pembimbing: [],
      pembimbing1: [],
      pembimbing2: [],
      scorePendidikan: [],
      scoreFungsional: [],
      scoreKompetensi1: [],
      scoreKompetensi2: [],
      scoreKompetensi3: [],
      scoreKuota1: [],
      scoreKuota2: [],
      selected1: {},
      selected2: {},
    };
  }

  componentDidMount() {
    Axios.get(APP_SERVER_URL + API_KRITERIA)
      .then((response) => {
        this.setState({
          kriteria: response.data[0],
        });
      })
      .then(() => {
        Axios.get(APP_SERVER_URL + API_STATIK).then((response) => {
          this.setState({
            statikKonsentrasi: response.data[0].kompetensi,
          });
        });
      })
      .then(() => {
        Axios.get(APP_SERVER_URL + API_PEMBIMBING)
          .then((response) => {
            let dummyPembimbing = this.state.pembimbing;
            response.data.forEach((pembimbing, n) => {
              let dummyData = {
                index: n,
                _id: pembimbing._id,
                nik: pembimbing.nik,
                fungsional: pembimbing.fungsional,
                kompetensi1: pembimbing.kompetensi1,
                kompetensi2: pembimbing.kompetensi2,
                kompetensi3: pembimbing.kompetensi3,
                kuota1: pembimbing.kuota1,
                kuota2: pembimbing.kuota2,
                nama: pembimbing.nama,
                pendidikan: pembimbing.pendidikan,
                status: pembimbing.status,
                score1: 0,
                score2: 0,
                isDisabled: false,
                btn: "btn btn-primary",
              };
              dummyPembimbing.push(dummyData);
            });
            this.setState({
              pembimbing: dummyPembimbing,
              konsentrasi: Number(this.props.match.params.index),
            });
          })
          .then(() => {
            // scoring pembimbing
            this.state.pembimbing.forEach((pembimbing) => {
              let scorePendidikan = 0;
              let scoreFungsional = 0;
              let scoreKompetensi1 = 0;
              let scoreKompetensi2 = 0;
              let scoreKompetensi3 = 0;
              let scoreKuota1 = 0;
              let scoreKuota2 = 0;

              // score pendidikan
              switch (pembimbing.pendidikan) {
                case "S2":
                  scorePendidikan = 0.5;
                  break;
                case "S3":
                  scorePendidikan = 1;
                  break;
                default:
                  console.warn(pembimbing.nama + ": Pendidikan not found!");
                  break;
              }
              let dummyPendidikan = this.state.scorePendidikan;
              dummyPendidikan.push(scorePendidikan);

              // score fungsional
              switch (pembimbing.fungsional) {
                case "Tenaga Pengajar":
                  scoreFungsional = 0;
                  break;
                case "Asisten Ahli":
                  scoreFungsional = 0.25;
                  break;
                case "Lektor":
                  scoreFungsional = 0.5;
                  break;
                case "Lektor Kepala":
                  scoreFungsional = 0.75;
                  break;
                case "Guru Besar":
                  scoreFungsional = 1;
                  break;
                default:
                  console.warn(pembimbing.nama + ": Fungsional not found!");
                  break;
              }
              let dummyFungsional = this.state.scoreFungsional;
              dummyFungsional.push(scoreFungsional);

              // score kompetensi1
              switch (pembimbing.kompetensi1) {
                case 1:
                  scoreKompetensi1 = 1;
                  break;
                case 2:
                  scoreKompetensi1 = 0.83;
                  break;
                case 3:
                  scoreKompetensi1 = 0.67;
                  break;
                case 4:
                  scoreKompetensi1 = 0.5;
                  break;
                case 5:
                  scoreKompetensi1 = 0.33;
                  break;
                case 6:
                  scoreKompetensi1 = 0.16;
                  break;
                default:
                  console.warn(pembimbing.nama + ": Kompetensi I not found!");
                  break;
              }
              let dummyKompetensi1 = this.state.scoreKompetensi1;
              dummyKompetensi1.push(scoreKompetensi1);

              // score kompetensi2
              switch (pembimbing.kompetensi2) {
                case 1:
                  scoreKompetensi2 = 1;
                  break;
                case 2:
                  scoreKompetensi2 = 0.83;
                  break;
                case 3:
                  scoreKompetensi2 = 0.67;
                  break;
                case 4:
                  scoreKompetensi2 = 0.5;
                  break;
                case 5:
                  scoreKompetensi2 = 0.33;
                  break;
                case 6:
                  scoreKompetensi2 = 0.16;
                  break;
                default:
                  console.warn(pembimbing.nama + ": Kompetensi II not found!");
                  break;
              }
              let dummyKompetensi2 = this.state.scoreKompetensi2;
              dummyKompetensi2.push(scoreKompetensi2);

              // score kompetensi3
              switch (pembimbing.kompetensi3) {
                case 1:
                  scoreKompetensi3 = 1;
                  break;
                case 2:
                  scoreKompetensi3 = 0.83;
                  break;
                case 3:
                  scoreKompetensi3 = 0.67;
                  break;
                case 4:
                  scoreKompetensi3 = 0.5;
                  break;
                case 5:
                  scoreKompetensi3 = 0.33;
                  break;
                case 6:
                  scoreKompetensi3 = 0.16;
                  break;
                default:
                  console.warn(pembimbing.nama + ": Kompetensi II not found!");
                  break;
              }
              let dummyKompetensi3 = this.state.scoreKompetensi3;
              dummyKompetensi3.push(scoreKompetensi3);

              // score kuota 1
              if (pembimbing.kuota1 >= 0 && pembimbing.kuota1 <= 2) {
                scoreKuota1 = 1;
              } else if (pembimbing.kuota1 >= 3 && pembimbing.kuota1 <= 4) {
                scoreKuota1 = 0.9;
              } else if (pembimbing.kuota1 >= 5 && pembimbing.kuota1 <= 6) {
                scoreKuota1 = 0.8;
              } else if (pembimbing.kuota1 >= 7 && pembimbing.kuota1 <= 8) {
                scoreKuota1 = 0.7;
              } else if (pembimbing.kuota1 >= 9 && pembimbing.kuota1 <= 10) {
                scoreKuota1 = 0.6;
              } else if (pembimbing.kuota1 >= 11 && pembimbing.kuota1 <= 12) {
                scoreKuota1 = 0.5;
              } else if (pembimbing.kuota1 >= 13 && pembimbing.kuota1 <= 14) {
                scoreKuota1 = 0.4;
              } else if (pembimbing.kuota1 >= 15 && pembimbing.kuota1 <= 16) {
                scoreKuota1 = 0.3;
              } else if (pembimbing.kuota1 >= 17 && pembimbing.kuota1 <= 18) {
                scoreKuota1 = 0.2;
              } else if (pembimbing.kuota1 >= 19 && pembimbing.kuota1 <= 20) {
                scoreKuota1 = 0.1;
              } else if (pembimbing.kuota1 >= 21) {
                scoreKuota1 = 0;
              } else {
                console.warn(pembimbing.nama + ": Kuota not found!");
              }

              // score kuota2
              if (pembimbing.kuota2 >= 0 && pembimbing.kuota2 <= 2) {
                scoreKuota2 = 1;
              } else if (pembimbing.kuota2 >= 3 && pembimbing.kuota2 <= 4) {
                scoreKuota2 = 0.9;
              } else if (pembimbing.kuota2 >= 5 && pembimbing.kuota2 <= 6) {
                scoreKuota2 = 0.8;
              } else if (pembimbing.kuota2 >= 7 && pembimbing.kuota2 <= 8) {
                scoreKuota2 = 0.7;
              } else if (pembimbing.kuota2 >= 9 && pembimbing.kuota2 <= 10) {
                scoreKuota2 = 0.6;
              } else if (pembimbing.kuota2 >= 11 && pembimbing.kuota2 <= 12) {
                scoreKuota2 = 0.5;
              } else if (pembimbing.kuota2 >= 13 && pembimbing.kuota2 <= 14) {
                scoreKuota2 = 0.4;
              } else if (pembimbing.kuota2 >= 15 && pembimbing.kuota2 <= 16) {
                scoreKuota2 = 0.3;
              } else if (pembimbing.kuota2 >= 17 && pembimbing.kuota2 <= 18) {
                scoreKuota2 = 0.2;
              } else if (pembimbing.kuota2 >= 19 && pembimbing.kuota2 <= 20) {
                scoreKuota2 = 0.1;
              } else if (pembimbing.kuota2 >= 21) {
                scoreKuota2 = 0;
              } else {
                console.warn(pembimbing.nama + ": Kuota not found!");
              }

              let dummyKuota1 = this.state.scoreKuota1;
              dummyKuota1.push(scoreKuota1);
              let dummyKuota2 = this.state.scoreKuota2;
              dummyKuota2.push(scoreKuota2);
            });
          })
          .then(() => {
            // hitung score akhir
            let dummyPembimbing = [];
            this.state.pembimbing.forEach((pembimbing, n) => {
              // normalisasi pembimbing n
              let rA1C1 =
                this.state.scorePendidikan[n] /
                Math.max(...this.state.scorePendidikan);

              let rA1C2 = 0;
              if (Math.max(...this.state.scoreFungsional) !== 0) {
                rA1C2 =
                  this.state.scoreFungsional[n] /
                  Math.max(...this.state.scoreFungsional);
              }

              let rA1C3 = 0;
              switch (this.state.konsentrasi) {
                case 0:
                  rA1C3 =
                    this.state.scoreKompetensi1[n] /
                    Math.max(...this.state.scoreKompetensi1);
                  break;
                case 1:
                  rA1C3 =
                    this.state.scoreKompetensi2[n] /
                    Math.max(...this.state.scoreKompetensi2);
                  break;
                case 2:
                  rA1C3 =
                    this.state.scoreKompetensi3[n] /
                    Math.max(...this.state.scoreKompetensi3);
                  break;
                default:
                  console.warn("Kompetensi index not valid");
              }

              let rA1C41 = 0;
              if (Math.max(...this.state.scoreKuota1) !== 0) {
                rA1C41 =
                  this.state.scoreKuota1[n] / Math.max(...this.state.scoreKuota2);
              }
              let rA1C42 = 0;
              if (Math.max(...this.state.scoreKuota2) !== 0) {
                rA1C42 =
                  this.state.scoreKuota2[n] / Math.max(...this.state.scoreKuota2);
              }

              let VA1 =
                rA1C1 * this.state.kriteria.pembimbing1.pendidikan +
                rA1C2 * this.state.kriteria.pembimbing1.fungsional +
                rA1C3 * this.state.kriteria.pembimbing1.kompetensi +
                rA1C41 * this.state.kriteria.pembimbing1.kuota;

              let VA2 =
                rA1C1 * this.state.kriteria.pembimbing2.pendidikan +
                rA1C2 * this.state.kriteria.pembimbing2.fungsional +
                rA1C3 * this.state.kriteria.pembimbing2.kompetensi +
                rA1C42 * this.state.kriteria.pembimbing2.kuota;

              // set score
              let dummy = pembimbing;
              pembimbing.score1 =
                Math.round((VA1 + Number.EPSILON) * 100) / 100;

              pembimbing.score2 =
                Math.round((VA2 + Number.EPSILON) * 100) / 100;

              dummyPembimbing.push(dummy);

              // sorting
              this.setState({
                pembimbing1: JSON.parse(JSON.stringify(this.state.pembimbing)),
                pembimbing2: JSON.parse(JSON.stringify(this.state.pembimbing)),
              });

              let sort1 = this.state.pembimbing1.sort((a, b) => {
                if (a.score1 < b.score1) {
                  return 1;
                } else {
                  return -1;
                }
              });
              let sort2 = this.state.pembimbing2.sort((a, b) => {
                if (a.score2 < b.score2) {
                  return 1;
                } else {
                  return -1;
                }
              });

              this.setState({
                pembimbing1: sort1,
                pembimbing2: sort2,
              });
            });
          });
      });
  }

  pembimbing1() {
    return this.state.pembimbing1.map((dosen, n) => {
      let button = (
        <button
          type="submit"
          className={dosen.btn}
          onClick={this.onSelected.bind(this, dosen.index, true)}
        >
          Pilih
        </button>
      );
      if (
        this.state.selected1.index === dosen.index ||
        this.state.selected2.index === dosen.index
      ) {
        button = (
          <button type="submit" className={dosen.btn} disabled>
            Pilih
          </button>
        );
      }
      return (
        <Dosen
          dosen={dosen}
          kuota={this.state.pembimbing1[n].kuota1}
          score={this.state.pembimbing1[n].score1}
          button={button}
          deleteDosen={this.deleteDosen}
          key={dosen._id}
        />
      );
    });
  }

  pembimbing2() {
    return this.state.pembimbing2.map((dosen, n) => {
      let button = (
        <button
          type="submit"
          className={dosen.btn}
          onClick={this.onSelected.bind(this, dosen.index, false)}
        >
          Pilih
        </button>
      );
      if (
        this.state.selected1.index === dosen.index ||
        this.state.selected2.index === dosen.index
      ) {
        button = (
          <button type="submit" className={dosen.btn} disabled>
            Pilih
          </button>
        );
      }
      return (
        <Dosen
          dosen={dosen}
          kuota={this.state.pembimbing2[n].kuota2}
          score={this.state.pembimbing2[n].score2}
          button={button}
          deleteDosen={this.deleteDosen}
          key={dosen._id}
        />
      );
    });
  }

  onSelected(index, isFirst) {
    let tabelAtas = this.state.pembimbing1;
    let tabelBawah = this.state.pembimbing2;

    if (isFirst) {
      tabelAtas.forEach((pembimbing) => {
        if (pembimbing.index === index) {
          this.setState({
            selected1: pembimbing,
          });
          pembimbing.btn = "btn btn-success";
        } else {
          pembimbing.btn = "btn btn-secondary";
        }
      });
    } else {
      // Bawah
      tabelBawah.forEach((pembimbing) => {
        if (pembimbing.index === index) {
          this.setState({
            selected2: pembimbing,
          });
          pembimbing.btn = "btn btn-success";
        } else {
          pembimbing.btn = "btn btn-secondary";
        }
      });
    }

    this.setState({
      pembimbing1: tabelAtas,
      pembimbing2: tabelBawah,
    });
  }

  onReset() {
    this.setState({
      selected1: {},
      selected2: {},
    });

    this.state.pembimbing1.forEach((pembimbing) => {
      pembimbing.btn = "btn btn-primary";
    });
    this.state.pembimbing2.forEach((pembimbing) => {
      pembimbing.btn = "btn btn-primary";
    });
  }

  onSave() {
    // kuota pembimbing harus ditambah

    let updatePembimbing1 = {};
    let updatePembimbing2 = {};


    updatePembimbing1 = {
      nik: this.state.selected1.nik,
      nama: this.state.selected1.nama,
      pendidikan: this.state.selected1.pendidikan,
      fungsional: this.state.selected1.fungsional,
      kompetensi1: this.state.selected1.kompetensi1,
      kompetensi2: this.state.selected1.kompetensi2,
      kompetensi3: this.state.selected1.kompetensi3,
      kuota1: this.state.selected1.kuota1 + 1,
      kuota2: this.state.selected1.kuota2,
    };

    updatePembimbing2 = {
      nik: this.state.selected2.nik,
      nama: this.state.selected2.nama,
      pendidikan: this.state.selected2.pendidikan,
      fungsional: this.state.selected2.fungsional,
      kompetensi1: this.state.selected2.kompetensi1,
      kompetensi2: this.state.selected2.kompetensi2,
      kompetensi3: this.state.selected2.kompetensi3,
      kuota1: this.state.selected2.kuota1,
      kuota2: this.state.selected2.kuota2 + 1,
    };

    const data = {
      nama: this.props.match.params.nama,
      nim: this.props.match.params.nim,
      kompetensi: this.props.match.params.index,
      idPembimbing1: this.state.selected1._id,
      idPembimbing2: this.state.selected2._id,
      tahun: this.props.match.params.tahun,
      semester: this.props.match.params.semester,
      status: 0,
    };

    if (
      Object.keys(updatePembimbing1).length > 0 &&
      Object.keys(updatePembimbing2).length > 0
    ) {
      Axios.post(
        APP_SERVER_URL + API_PEMBIMBING_UPDATE + this.state.selected1._id,
        updatePembimbing1
      )
        .then((res) => {
          console.log(res.data);
          Axios.post(
            APP_SERVER_URL + API_PEMBIMBING_UPDATE + this.state.selected2._id,
            updatePembimbing2
          )
            .then((res) => {
              console.log(res.data);
              Axios.post(APP_SERVER_URL + API_BIMBINGAN_ADD, data)
                .then((res) => {
                  console.log(res.data);
                  alert(this.props.match.params.nama + " berhasil ditambahkan ke daftar bimbingan.")
                  window.location = "/rekomendasi";
                })
                .catch((error) => console.log("Error: " + error));
            })
            .catch((error) => console.log("Error: " + error));
        })
        .catch((error) => console.log("Error: " + error));
    } else {
      alert("Pilih dosen pembimbing.");
    }
  }

  render() {
    if (localStorage.getItem("loginState") === "0") {
      window.location = "/login";
    } else {
      return (
        <div className="container mt-4">
          <h3 className="text-center">HASIL REKOMENDASI DOSEN PEMBIMBING</h3>

          <div className="row justify-content-center mt-4">
            <div className="col-auto">
              <table className="table table-bordered">
                <thead className="thead-light text-center">
                  <tr>
                    <th className="align-middle">Nama Mahasiswa</th>
                    <th className="align-middle">NIM</th>
                    <th className="align-middle">Konsentrasi</th>
                    <th className="align-middle">Masa Registrasi</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr>
                    <td>{this.props.match.params.nama}</td>
                    <td>{this.props.match.params.nim}</td>
                    <td>{this.props.match.params.tahun}.{this.props.match.params.semester}</td>
                    <td>{this.state.statikKonsentrasi[this.props.match.params.index]}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h4 className="text-left">Pembimbing I</h4>
          <table className="table table-bordered">
            <thead className="thead-light text-center">
              <tr>
                <th className="align-middle">Nama Dosen</th>
                <th className="align-middle">NIK</th>
                <th className="align-middle">Pendidikan</th>
                <th className="align-middle">Fungsional</th>
                <th className="align-middle">STI</th>
                <th className="align-middle">SKC</th>
                <th className="align-middle">JARKOM</th>
                <th className="align-middle">Jumlah Bimbingan</th>
                <th className="align-middle">Skor</th>
                <th className="align-middle">Opsi</th>
              </tr>
            </thead>
            <tbody className="text-center">{this.pembimbing1()}</tbody>
          </table>
          <h4 className="text-left mt-4">Pembimbing II</h4>
          <table className="table table-bordered">
            <thead className="thead-light text-center">
              <tr>
                <th className="align-middle">Nama Dosen</th>
                <th className="align-middle">NIK</th>
                <th className="align-middle">Pendidikan</th>
                <th className="align-middle">Fungsional</th>
                <th className="align-middle">STI</th>
                <th className="align-middle">SKC</th>
                <th className="align-middle">JARKOM</th>
                <th className="align-middle">Jumlah Bimbingan</th>
                <th className="align-middle">Skor</th>
                <th className="align-middle">Opsi</th>
              </tr>
            </thead>
            <tbody className="text-center">{this.pembimbing2()}</tbody>
          </table>
          <div className="text-right">
            <button
              type="reset"
              className="btn btn-warning mb-4 mr-2"
              onClick={this.onReset}
            >
              Reset
            </button>
            <button
              type="submit"
              className="btn btn-primary w-25 mb-4"
              onClick={this.onSave}
            >
              Simpan
            </button>
          </div>
        </div>
      );
    }
  }
}
