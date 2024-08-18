import React from "react";
import './App.css'
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import BaptismCertificate from "./components/BaptismCertificate";
import LetterPad from "./components/LetterPad";
import MarriageForm from "./components/MarriageFrom";
import MarriageCertificate from "./components/MarriageCertificate";


function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/BaptismCertificate/:id" element={<BaptismCertificate />} />
        <Route path="/LatterPad/:id" element={<LetterPad/>} />
        <Route path="/MarriageForm/:id" element={<MarriageForm/>} />
        <Route path="/MarriageCertificate/:id" element={<MarriageCertificate/>} />
      </Routes>
    </div>
  );
}

export default App;
