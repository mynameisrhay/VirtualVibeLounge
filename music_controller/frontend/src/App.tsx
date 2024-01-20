import "./App.css";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RoomCreate from "./components/RoomCreate";
import RoomJoin from "./components/RoomJoin";
import Room from "./components/Room";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/create" element={<RoomCreate />}></Route>
        <Route path="/join" element={<RoomJoin />}></Route>
        <Route path="/room/:code" element={<Room />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
