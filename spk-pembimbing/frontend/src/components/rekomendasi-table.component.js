import React, { Component } from "react";
import Axios from "axios";

const API_PEMBIMBING = process.env.REACT_APP_API_PEMBIMBING;
const API_KRITERIA = process.env.REACT_APP_API_KRITERIA;

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
    <td>{props.score}</td>
    <td>
      <button type="submit" className="btn btn-primary">
        Pilih
      </button>
    </td>
  </tr>
);

export default class RekomendasiTable extends Component {
  constructor(props) {
    super(props);

    this.pembimbing1 = this.pembimbing1.bind(this);
    this.pembimbing2 = this.pembimbing2.bind(this);

    this.state = {
      kriteria: {},
      nama: "",
      nim: 0,
      kompetensiIndex: 0,
      pembimbing: [],
      scorePendidikan: [],
      scoreFungsional: [],
      scoreKompetensi1: [],
      scoreKompetensi2: [],
      scoreKompetensi3: [],
      scoreKuota: [],
    };
  }

  componentDidMount() {
    Axios.get(API_KRITERIA)
      .then((response) => {
        this.setState({
          kriteria: response.data[0],
        });
      })
      .then(() => {
        Axios.get(API_PEMBIMBING)
          .then((response) => {
            let dummyPembimbing = this.state.pembimbing;
            response.data.forEach((pembimbing) => {
              let dummyData = {
                _id: pembimbing._id,
                nik: pembimbing.nik,
                fungsional: pembimbing.fungsional,
                kompetensi1: pembimbing.kompetensi1,
                kompetensi2: pembimbing.kompetensi2,
                kompetensi3: pembimbing.kompetensi3,
                kuota: pembimbing.kuota,
                nama: pembimbing.nama,
                pendidikan: pembimbing.pendidikan,
                score1: 0,
                score2: 0,
              };
              dummyPembimbing.push(dummyData);
            });
            this.setState({
              pembimbing: dummyPembimbing,
            });
            this.setState({
              nama: this.props.match.params.nama,
              nim: Number(this.props.match.params.nim),
              kompetensiIndex: Number(this.props.match.params.index),
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
              let scoreKuota = 0;

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

              // score kuota
              if (pembimbing.kuota >= 0 && pembimbing.kuota <= 5) {
                scoreKuota = 1;
              } else if (pembimbing.kuota >= 6 && pembimbing.kuota <= 10) {
                scoreKuota = 0.75;
              } else if (pembimbing.kuota >= 11 && pembimbing.kuota <= 15) {
                scoreKuota = 0.5;
              } else if (pembimbing.kuota >= 16 && pembimbing.kuota <= 20) {
                scoreKuota = 0.25;
              } else if (pembimbing.kuota >= 21) {
                scoreKuota = 0;
              } else {
                console.warn(pembimbing.nama + ": Kuota not found!");
              }
              let dummyKuota = this.state.scoreKuota;
              dummyKuota.push(scoreKuota);

              this.setState({
                scorePendidikan: dummyPendidikan,
                scoreFungsional: dummyFungsional,
                scoreKompetensi1: dummyKompetensi1,
                scoreKompetensi2: dummyKompetensi2,
                scoreKompetensi3: dummyKompetensi3,
                dummyKuota: dummyKuota,
              });
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

              let rA1C2 =
                this.state.scoreFungsional[n] /
                Math.max(...this.state.scoreFungsional);

              let rA1C3 = 0;
              switch (this.state.kompetensiIndex) {
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

              let rA1C4 =
                this.state.scoreKuota[n] / Math.max(...this.state.scoreKuota);

              let VA1 =
                rA1C1 * this.state.kriteria.pembimbing1.pendidikan +
                rA1C2 * this.state.kriteria.pembimbing1.fungsional +
                rA1C3 * this.state.kriteria.pembimbing1.kompetensi +
                rA1C4 * this.state.kriteria.pembimbing1.kuota;

              let VA2 =
                rA1C1 * this.state.kriteria.pembimbing2.pendidikan +
                rA1C2 * this.state.kriteria.pembimbing2.fungsional +
                rA1C3 * this.state.kriteria.pembimbing2.kompetensi +
                rA1C4 * this.state.kriteria.pembimbing2.kuota;

              // set score
              let dummy = pembimbing;
              pembimbing.score1 = {
                index: n,
                score: VA1,
              };

              pembimbing.score2 = {
                index: n,
                score: VA2,
              };

              dummyPembimbing.push(dummy);
            });
            dummyPembimbing.sort(this.compare);
            this.setState({
              pembimbing: dummyPembimbing,
            });
          });
      });
  }

  compare(a, b) {
    if (a.score1.score > b.score1.score) {
      return -1;
    } else if (a.score1.score < b.score1.score) {
      return 1;
    }
    return 0;
  }

  pembimbing1() {
    return this.state.pembimbing.map((dosen, n) => {
      return (
        <Dosen
          dosen={dosen}
          score={this.state.pembimbing[n].score1.score}
          deleteDosen={this.deleteDosen}
          key={dosen._id}
        />
      );
    });
  }

  pembimbing2() {
    return this.state.pembimbing.map((dosen, n) => {
      return (
        <Dosen
          dosen={dosen}
          score={this.state.pembimbing[n].score2.score}
          deleteDosen={this.deleteDosen}
          key={dosen._id}
        />
      );
    });
  }

  render() {
    return (
      <div className="container mt-4">
        <h3 className="text-center">HASIL REKOMENDASI DOSEN PEMBIMBING</h3>
        <h4 className="text-left mt-4">Pembimbing I</h4>
        <table className="table table-bordered">
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
              <th className="align-middle">Nama</th>
              <th className="align-middle">NIK</th>
              <th className="align-middle">Pendidikan</th>
              <th className="align-middle">Fungsional</th>
              <th className="align-middle">Kompetensi I</th>
              <th className="align-middle">Kompetensi II</th>
              <th className="align-middle">Kompetensi III</th>
              <th className="align-middle">Kuota</th>
              <th className="align-middle">Skor</th>
              <th className="align-middle">Opsi</th>
            </tr>
          </thead>
          <tbody className="text-center">{this.pembimbing2()}</tbody>
        </table>
        <div className="text-right">
          <button
            type="submit"
            className="btn btn-primary w-25 mb-4"
            onClick={this.onSave}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}
