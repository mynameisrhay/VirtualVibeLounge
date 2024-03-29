import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingPage from "./Loading";
import RoomCreate from "./RoomCreate";

function Room() {
  const [guestCanPause, setGuestCanPause] = useState(Boolean);
  const [votesToSkip, setVotesToSkip] = useState(Number);
  const [isHost, setIsHost] = useState(Boolean);
  const { code } = useParams();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [updateMode, setUpdateMode] = useState(false);

  // async functions
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

  const handleAuthenticationClick = () => {
    // Redirect the user to the Spotify authentication endpoint
    window.location.href =
      "http://127.0.0.1:8000/spotify/spotify-authenticate/";
  };

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

  const handleCancel = () => {
    setUpdateMode(false);
  };

  // display/render functions (this might be a separate component in the future but for now, it will be a function)
  const handleDisplayError = (errorMessageDisplayed: string) => {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error | </strong>
        <span className="block sm:inline"> {errorMessageDisplayed}</span>
      </div>
    );
  };

  const handleDisplayEditButtons = () => {
    return (
      isHost && (
        <button
          className="bg-green-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => setUpdateMode(true)}
        >
          Edit
        </button>
      )
    );
  };

  const handleDisplayRoomView = () => {
    return (
      <div className="text-center mt-8">
        {loading ? (
          <LoadingPage />
        ) : errorMessage ? (
          handleDisplayError(errorMessage)
        ) : (
          <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">Room View</h1>
            <p className="text-lg mb-2">Room Code: {code}</p>

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
              {handleDisplayEditButtons()}
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button onClick={handleAuthenticationClick}>
                Authenticate with Spotify
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    handleViewRoom();
  }, [updateMode]); // The empty dependency array ensures useEffect runs only once after mounting

  return updateMode ? (
    <RoomCreate
      propEditMode={true}
      propGuestCanPause={guestCanPause}
      propVotesToSkip={votesToSkip}
      roomCode={code}
      onCancel={handleCancel}
    />
  ) : (
    handleDisplayRoomView()
  );
}

export default Room;
