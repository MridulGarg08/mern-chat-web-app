import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      // const socket = io("https://mern-chat-web-app-1-qcdj.onrender.com", {
      //   query: {
      //     userId: authUser._id,
      //   },
      // });
      const socket = io(
        import.meta.env.PROD
          ? "https://mern-chat-web-app-1-qcdj.onrender.com"
          : "http://localhost:4000",
        {
          query: { userId: authUser._id },
        }
      );

      setSocket(socket);
      // socket.on() is used to listen to the events. can be used both on client and server side
      socket.on("getOnlineUsers", (users) => {
        // console.log("Online users:", users);
        setOnlineUsers(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
