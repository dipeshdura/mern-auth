import React, { useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";
const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const passwordRef = useRef();
  const { loading, error } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signinForm } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      return;
    }
    try {
      dispatch(signInStart());
      const result = await signinForm(formData);

      if (result.success === false) {
        dispatch(signInFailure(result));
        toast.error(error);
        return;
      }
      dispatch(signInSuccess(result));
      toast.success("SignIn successful")
      setFormData({
        email: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
      toast.error(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          value={formData.email || ""}
          onChange={handleChange}
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          value={formData.password || ""}
          onChange={handleChange}
          checked
        />
        <input
          type="checkbox"
          onClick={(e) => {
            passwordRef.current.type = e.target.checked ? "text" : "password";
          }}
          name="showPassword"
          id="showPassword"
        />

        <button
          disabled={loading}
          className="bg-white text-black border-[#c8bdbd] border p-3 cursor-pointer rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex justify-center mx-auto gap-2 mt-5">
        <p>{"Don't Have an Account?"}</p>
        <a href="/sign-up">
          <span className="text-blue-500">Sign up</span>
        </a>
      </div>
      <p className="text-red-700 mt-5">
        {error ? error.message || "Something went wrong 😳" : ""}
      </p>
    </div>
  );
};

export default SignIn;
