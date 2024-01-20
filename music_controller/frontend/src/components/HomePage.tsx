import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  async function handleUserInRoom() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/user-in-room/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any necessary headers for authorization, etc.
        },
        credentials: "include",
        body: JSON.stringify({ loggedOut: false }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success Response:", data);
        // Handle success, update UI, etc.

        setRoomCode(data.code);
      } else {
        console.error("Error Response: ", response.status);
        // Handle error, show message, etc.
      }
      roomCode && navigate(`/room/${roomCode}`);
    } catch (error) {
      console.error("API error:", error);
      // Handle error, show message, etc.
    }
  }

  useEffect(() => {
    handleUserInRoom();
  }, [roomCode]);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">VirtualVibe Lounge</h1>
      <p className="text-gray-600 mb-2">
        Unleash the Party, Right from Your Device.
      </p>
      <div className="mb-4"></div>
      <div className="flex justify-between">
        <Link to="/create">
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300">
            Create a Room
          </button>
        </Link>
        <Link to="/join">
          <button className="bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-300 hover:to-teal-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300">
            Join a Room
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
