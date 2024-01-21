import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingPage from "./Loading";

function Room() {
  const [guestCanPause, setGuestCanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [isHost, setIsHost] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);
  const { code } = useParams();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function handleEditRoomEdit() {
    console.log("Clicked edit");
    setUpdateMode(true);
  }

  async function handleLogout() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/user-in-room/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any necessary headers for authorization, etc.
        },
        credentials: "include",
        body: JSON.stringify({ loggedOut: true }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Logout | Success Response:", data);
        // Handle success, update UI, etc.

        navigate("/");
      } else {
        console.error("Logout | Error Response: ", response.status);
        // Handle error, show message, etc.
      }
    } catch (error) {
      console.error("Logout | API error:", error);
      // Handle error, show message, etc.
    }
  }

  const handleViewRoom = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/access/?code=${code}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("View Room | Success Response:", data);
        // Handle success, update UI, etc.

        setGuestCanPause(data.guest_can_pause);
        setVotesToSkip(data.votes_to_skip);
        setIsHost(data.is_host);
        setErrorMessage("");
      } else {
        console.error("View Room | Error Response: ", response.status);
        // Handle error, show message, etc.
        setErrorMessage(`View Room | Error Response: ${response.status}`);
      }
    } catch (error) {
      console.error("View Room | API error:", error);
      // Handle error, show message, etc.
      setErrorMessage("API error");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestControlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuestCanPause(e.target.value === "true");
  };

  const handleVotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVotesToSkip(parseInt(e.target.value));
  };

  useEffect(() => {
    handleViewRoom();
  }, [updateMode]); // The empty dependency array ensures useEffect runs only once after mounting

  return (
    <div className="text-center mt-8">
      {loading ? (
        <LoadingPage />
      ) : errorMessage ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error | </strong>
          <span className="block sm:inline"> {errorMessage}</span>
        </div>
      ) : (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Room View</h1>
          <p className="text-lg mb-2">Room Code: {code}</p>
          {updateMode ? (
            <div className="mb-4">
              <hr />
              <h3 className="text-2xl font-bold mb-4 text-green-700">
                Edit Mode
              </h3>
              <p className="text-gray-600 mb-2">
                Guest control or playback state
              </p>
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
              <hr />
            </div>
          ) : (
            <>
              <p className="text-lg mb-2">
                Guest Can Pause:{" "}
                <span
                  className={
                    guestCanPause
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  {guestCanPause ? "YES" : "NO"}
                </span>
              </p>
              <p className="text-lg mb-2">
                Required Votes to Skip:{" "}
                <span className="text-blue-600 font-bold">{votesToSkip}</span>
              </p>
            </>
          )}
          <p className="text-lg mb-2">
            Is Host:{" "}
            <span
              className={
                isHost ? "text-green-600 font-bold" : "text-red-600 font-bold"
              }
            >
              {isHost ? "YES" : "NO"}
            </span>
          </p>
          <div className="flex justify-between">
            {isHost &&
              (!updateMode ? (
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleEditRoomEdit}
                >
                  Edit
                </button>
              ) : (
                <>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={console.log("Save")}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={console.log("Cancel Saving")}
                  >
                    Cancel
                  </button>
                </>
              ))}
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Room;
