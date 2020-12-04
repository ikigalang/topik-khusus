import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import Root from "./components/root.component";
import Home from "./components/home.component";
import Login from "./components/login.component";
import InputMahasiswa from "./components/input-mahasiswa.component";
import InputDosen from "./components/input-dosen.component";
import EditDosen from "./components/edit-dosen.component";
import EditMahasiswa from "./components/edit-mahasiswa.component";
import DaftarDosen from "./components/daftar-dosen.component";
import DaftarMahasiswa from "./components/daftar-mahasiswa.component";
import EditKriteria from "./components/edit-kriteria.component";
import Rekomendasi from "./components/rekomendasi.component";
import RekomendasiTable from "./components/rekomendasi-table.component";
import DaftarBimbingan from "./components/daftar-bimbingan.component";

function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/" exact component={Root} />
      <Route path="/home" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/input-mahasiswa" component={InputMahasiswa} />
      <Route path="/input-dosen" component={InputDosen} />
      <Route path="/edit-mahasiswa/:nim" component={EditMahasiswa} />
      <Route path="/edit-dosen/:id" component={EditDosen} />
      <Route path="/daftar-dosen" component={DaftarDosen} />
      <Route path="/daftar-mahasiswa" component={DaftarMahasiswa} />
      <Route path="/edit-kriteria" component={EditKriteria} />
      <Route path="/rekomendasi" exact component={Rekomendasi} />
      <Route
        path="/rekomendasi/hasil/:nama/:nim/:index/:semester/:tahun"
        component={RekomendasiTable}
      />
      <Route path="/daftar-bimbingan" component={DaftarBimbingan} />
    </Router>
  );
}

export default App;
