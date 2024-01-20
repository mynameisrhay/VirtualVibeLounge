import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RoomCreate from "./components/RoomCreate";
import RoomJoin from "./components/RoomJoin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/create" element={<RoomCreate />}></Route>
        <Route path="/join" element={<RoomJoin />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
