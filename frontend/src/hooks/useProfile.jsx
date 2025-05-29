import { toast } from "react-toastify";
import { API_URL } from "../contextapi/api";

export const useProfile = () => {
  
  const updateProfile = async ({ username, email, password }, image, id) => {
    const formData = new FormData();
    if (username) formData.append("username", username);
    if (email) formData.append("email", email);
    if (password) formData.append("password", password);
    if (image) formData.append("image", image);

    try {
      const res = await fetch(`${API_URL}/api/user/update/${id}`, {
        method: "PATCH",
        body: formData,
        headers:{
          "Authorization":`Bearer ${token}`
        }
        credentials: "include",
      });
      const data = await res.json();
      return data;
    } catch (error) {
      toast.error("Something went wrong");
      return error;
    }
  };
  const deleteProfile = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/user/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const signout = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/signout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return { updateProfile, deleteProfile, signout };
};
