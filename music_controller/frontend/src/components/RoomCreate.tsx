import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function RoomCreate({
  propEditMode = false,
  propGuestCanPause = true,
  propVotesToSkip = 2,
  roomCode,
  onCancel,
}: {
  propEditMode?: boolean;
  propGuestCanPause?: boolean;
  propVotesToSkip?: number;
  roomCode?: string;
  onCancel?: () => void;
}) {
  const [guestCanPause, setGuestCanPause] = useState(propGuestCanPause);
  const [votesToSkip, setVotesToSkip] = useState(propVotesToSkip);
  const editMode = propEditMode;
  const navigate = useNavigate();
  const pageDetails = {
    roomTitle: editMode ? `Update Room: Room ID ${roomCode}` : "Create Room",
    buttonTitle: editMode ? `Update Room` : "Create Room",
  };

  // event functions
  const handleGuestControlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuestCanPause(e.target.value === "true");
  };

  const handleVotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVotesToSkip(parseInt(e.target.value));
  };

  // async functions
  async function handleCreateRoom() {
    const requestBody = {
      guest_can_pause: guestCanPause,
      votes_to_skip: votesToSkip,
      // Other data to send to the Django backend
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any necessary headers for authorization, etc.
        },
        credentials: "include",
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Room created:", data);
        // Handle success, update UI, etc.
        editMode ? handleCancelClick() : navigate(`/room/${data.code}`);
      } else {
        console.error("Failed to create room:", response.status);
        // Handle error, show message, etc.
      }
    } catch (error) {
      console.error("API error:", error);
      // Handle error, show message, etc.
    }
  }

  const handleCancelClick = () => {
    onCancel && onCancel();
  };

  // useEffect(() => {}, []);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{pageDetails.roomTitle}</h1>
      <p className="text-gray-600 mb-2">Guest control or playback state</p>
      <div className="mb-4">
        <label className="inline-flex items-center mr-4">
          <input
            type="radio"
            className="form-radio h-5 w-5 text-blue-600"
            name="guestControl"
            value="true"
            checked={guestCanPause}
            onChange={handleGuestControlChange}
          />
          <span className="ml-2">Play/Pause</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio h-5 w-5 text-blue-600"
            name="guestControl"
            value="false"
            checked={!guestCanPause}
            onChange={handleGuestControlChange}
          />
          <span className="ml-2">No Control</span>
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="votes" className="text-gray-600 mb-2 block">
          Votes to Skip
        </label>
        <input
          type="number"
          id="votes"
          value={votesToSkip}
          onChange={handleVotesChange}
          className="w-full border rounded-md px-3 py-2"
        />
      </div>
      <div className="flex justify-between">
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
          onClick={handleCreateRoom}
        >
          {pageDetails.buttonTitle}
        </button>
        {editMode ? (
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => handleCancelClick()}
          >
            Cancel
          </button>
        ) : (
          <Link to="/">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Back
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default RoomCreate;
