import useConversation from "../../zustand/useConversation";
import { IoClose } from "react-icons/io5";

const UserProfile = () => {
  const { selectedProfile, clearSelectedProfile } = useConversation();

  if (!selectedProfile) return null;

  return (
    <div className="fixed top-4 right-4 bg-white rounded-xl shadow-lg w-72 p-5 z-50 text-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">User Profile</h2>
        <button onClick={clearSelectedProfile}>
          <IoClose size={24} />
        </button>
      </div>
      <div className="flex flex-col items-center">
        <img
          src={selectedProfile.profilePic || "/default-profile.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-3"
        />
        <h3 className="font-bold text-xl">{selectedProfile.fullName}</h3>
        <p className="text-sm text-gray-600">@{selectedProfile.userName}</p>
        <p className="text-sm text-gray-600">{selectedProfile.gender}</p>
        {/* <p className="mt-2 text-sm">Email: {selectedProfile.email}</p> */}
      </div>
    </div>
  );
};

export default UserProfile;
