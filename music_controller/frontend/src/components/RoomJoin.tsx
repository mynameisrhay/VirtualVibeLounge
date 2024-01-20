import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function RoomJoin() {
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomCode(event.target.value);
  };

  const handleEnterRoom = () => {
    // Replace this with the actual logic to join the room
    console.log(`Joining room with code: ${roomCode}`);
    navigate(`/room/${roomCode}`);
  };

  return (
    <div className="container mx-auto  p-4">
      <div className="mt-8 flex items-center justify-center ">
        <div
          className="m-4 rounded-lg  bg-white p-8 shadow-md sm:m-6 md:m-8"
          id="joinroom"
        >
          <h2 className="mb-6 text-center text-3xl font-bold">Join a Room</h2>
          <div className="relative mb-4">
            <input
              type="text"
              id="roomCode"
              value={roomCode}
              onChange={handleInputChange}
              className="w-full rounded-md bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Room Code here"
            />
            <i className="fas fa-keyboard absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
          <div className="flex justify-between">
            <button
              className="rounded-md bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 font-bold text-white transition-all duration-300 hover:from-purple-700 hover:to-blue-700"
              onClick={handleEnterRoom}
            >
              Enter Room
            </button>
            <Link to="/">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => console.log("Clicked back")}
              >
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomJoin;
