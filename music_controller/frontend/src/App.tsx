import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./components/HomePage";
import RoomCreate from "./components/RoomCreate";
import RoomJoin from "./components/RoomJoin";
import Intro from "./components/Message";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Intro />
      <HomePage />
      <RoomCreate />
      <RoomJoin />
    </div>
  );
}

export default App;
