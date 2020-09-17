import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import Home from "./components/home.component";
import Login from "./components/login.component";
import InputDosen from "./components/input-dosen.component";
import EditDosen from "./components/edit-dosen.component";
import DaftarDosen from "./components/daftar-dosen.component";

function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/input-dosen" component={InputDosen} />
      <Route path="/edit-dosen" component={EditDosen} />
      <Route path="/daftar-dosen" component={DaftarDosen} />
    </Router>
  );
}

export default App;