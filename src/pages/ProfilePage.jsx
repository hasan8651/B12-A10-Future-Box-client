import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { user, updateProfileFunction } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "https://img.icons8.com/windows/64/user.png");

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await updateProfileFunction({
      displayName,
      photoURL,
    });

    toast.success("Profile updated successfully!");
  } catch (error) {
    toast.error(`Error updating profile: ${error.message}`);
  }
};

  return (
    <div className="max-w-md mx-auto my-8 bg-blue-50 p-6 rounded-lg shadow-lg">
      <Helmet><title>ToyTopia - Profile</title></Helmet>
      <h2 className="text-2xl font-semibold mb-4 text-center">My Profile</h2>

      <div className="flex flex-col items-center mb-6">
        <img
          src={photoURL || "https://img.icons8.com/windows/64/user.png"}
          alt="user photo"
          className="w-50 h-50 rounded-full border border-gray-300 mb-2 object-cover"
        />
        <p className="text-lg font-medium">{user?.displayName}</p>
        <p className="text-lg font-medium">{user?.email}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter new display name"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Photo URL</label>
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter new photo URL"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;