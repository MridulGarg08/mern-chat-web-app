import { useMemo } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation, setSelectedProfile } =
    useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  // const { authUser } = useAuthContext();

  // const otherUserId = conversation.participants.find(
  //   (id) => id !== authUser._id
  // );
  // console.log("conversation", conversation);
  // console.log(onlineUsers);

  console.log(
    "Checking isOnline for:",
    conversation.fullName,
    conversation._id
  );
  console.log("Online users from context:", onlineUsers);

  const isOnline = useMemo(() => {
    if (!Array.isArray(onlineUsers) || onlineUsers.length === 0) return false;
    return onlineUsers.includes(conversation._id);
  }, [onlineUsers, conversation._id]);
  console.log(isOnline);

  const handleProfileClick = (e) => {
    e.stopPropagation(); // prevent selecting conversation
    setSelectedProfile(conversation); // open profile view
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img
              src={conversation.profilePic}
              alt="user avatar"
              onClick={handleProfileClick}
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default Conversation;
