import React, {  useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useProfile } from "../hooks/useProfile";
import {
  deleteUserFailure,
  deleteUserStart,
  signOutFailure,
  signOutSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);

  
  const { id } = useParams();

  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileRef = useRef();
  const { updateProfile, deleteProfile, signout } = useProfile();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const [preview, setPreview] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // set the actual file
      setPreview(URL.createObjectURL(file)); // for immediate UI preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const result = await updateProfile(formData, image, id);

      if (result.success === false) {
        dispatch(updateUserFailure(result));
        toast.error(result.message || "Update failed");
        return;
      }
    

      dispatch(updateUserSuccess(result));
      toast.success("Update successful");
      setImage(null);
      setPreview(null);
      setFormData({ password: "" });
      setImage(null);
    } catch (error) {
      toast.error(error);
      dispatch(updateUserFailure(error));
    }
  };
  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const result = await deleteProfile(currentUser?._id);
      if (result.success === false) {
        dispatch(deleteUserFailure(result));
        toast.error(error);
        return;
      }
      dispatch(signOutSuccess());
      navigate("/sign-in");
    } catch (error) {
      dispatch(deleteUserFailure(error));
      toast.error(error);
    }
  };
  const handleSignOut = async () => {
    try {
      await signout();
      dispatch(signOutSuccess());
      toast.success("Logout successfully");
    } catch (error) {
      dispatch(signOutFailure(error));
      toast.error(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          ref={fileRef}
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />
        {/* 
      firebase storage rules:  
      allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*') */}

        <img
          src={preview||currentUser?.profilePicture || currentUser?.user?.profilePicture}
          alt="profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2 "
          onClick={() => fileRef.current.click()}
           referrerPolicy="no-referrer"
        />
  

        <input
          defaultValue={currentUser?.user?.username || currentUser?.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser?.user?.email || currentUser?.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <button className="bg-white text-black border cursor-pointer border-[#c8bdbd] p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading" : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span
          className="text-red-700 cursor-pointer"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer" onClick={handleSignOut}>
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-5">
        {error ? error.message || "Something went wrong 😳" : ""}
      </p>
    </div>
  );
};

export default Profile;
