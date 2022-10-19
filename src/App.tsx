import { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";

function App() {
  const [socket, setSocket] = useState<any>(null);
  const [socketConnected, setSocketConnected] = useState(false);
  useEffect(() => {
    setSocket(
      io("http://192.168.1.17:80", {
        extraHeaders: {
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
        },
      })
    );
  }, []);

  // subscribe to the socket event
  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      setSocketConnected(socket.connected);
    });
    socket.on("disconnect", () => {
      setSocketConnected(socket.connected);
    });
  }, [socket]);

  // manage socket connection
  const handleSocketConnection = () => {
    if (socketConnected) socket.disconnect();
    else {
      socket.connect();
    }
  };

  return (
    <div>
      <h2>
        Welcome to Socket.IO App! -
        <a href="https://www.cluemediator.com/" target="_blank">
          Clue Mediator
        </a>
      </h2>
    </div>
  );
}

export default App;
