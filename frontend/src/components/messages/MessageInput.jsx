import { useEffect, useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

let typingTimeout;

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const { selectedConversation } = useConversation();
  const { socket } = useSocketContext();
  const isTyping = useRef(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!message) return;
    if (!message.trim()) return; //new
    socket?.emit("stopTyping", { to: selectedConversation._id }); //new
    await sendMessage(message);
    setMessage("");
    isTyping.current = false;
  };

  const handleTyping = (e) => {
    const value = e.target.value;
    setMessage(value);

    if (!socket || !selectedConversation) return;

    if (!isTyping.current) {
      isTyping.current = true;
      socket.emit("typing", { to: selectedConversation._id });
      // console.log("Sent typing event to:", selectedConversation._id);
    }

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      isTyping.current = false;
      socket.emit("stopTyping", { to: selectedConversation._id });
    }, 1500); // 1.5s of inactivity = stop typing
  };

  useEffect(() => {
    return () => {
      clearTimeout(typingTimeout);
      if (isTyping.current && selectedConversation && socket) {
        socket.emit("stopTyping", { to: selectedConversation._id });
      }
    };
  }, [selectedConversation, socket]);

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          // onChange={(e) => setMessage(e.target.value)}
          onChange={handleTyping} //new
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
