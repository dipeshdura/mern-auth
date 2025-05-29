import React, { useRef, useState } from 'react'
import { useAuth } from '../hooks/useAuth';
import OAuth from '../components/OAuth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {signUpStart,signUpSuccess,signUpFailure} from "../redux/user/userSlice";
import { toast } from 'react-toastify';

const SignUp = () => {
    const [formData, setFormData] =useState({
      username:"",
      email:"",
      password:""
    });
    
    const navigate =useNavigate();
    const passwordRef =useRef();
    const {loading,error} =useSelector((state)=>state.user);
    const dispatch =useDispatch();
    const handleChange =(e)=>{

        setFormData({
            ...formData,[e.target.id]:e.target.value
        })
    }
    const {signupForm} =useAuth();
    const handleSubmit =async(e)=>{
      e.preventDefault();
      const {username,email,password} =formData;
      if(!username || !email || !password){
        toast.error("All fileds are required")
        return
      }
      try {
        dispatch(signUpStart());
        const result =await signupForm(formData);
      
        if(result.success ===false){
          dispatch(signUpFailure(result));
          toast.error(error);
          return;
        }
        dispatch(signUpSuccess(result));
        toast.success("Signup successful")
        setFormData({
          username:"",
          email:"",
          password:""
        })
        navigate("/sign-in");
      } catch (error) {
       dispatch(signUpFailure(error));
       toast.error(error);
      }
    }
  return (
       <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
             type="text"
             placeholder="Username"
             id="username"
             className="bg-slate-100 p-3 rounded-lg"
             value={formData.username || ""}
             onChange={handleChange}
              />
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
              />
               <input type="checkbox" onClick={(e)=>{
                passwordRef.current.type =e.target.checked ? "text":"password"
               }} name="showPassword" id="showPassword"  />
              <button disabled={loading}
              className="bg-white text-black border-[#c8bdbd] border p-3 cursor-pointer rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              >
               {loading ? "Loading...": "Sign Up"}
                </button>
                <OAuth/>
        </form>
        <div className="flex justify-center mx-auto gap-2 mt-5">
            <p>{"I Have an Account?"}</p>
            <a href="/sign-in">
                <span className="text-blue-500">Sign in</span>
            </a>
        </div>
        <p className="text-red-700 mt-5">
            {error ? error.message || "Something went wrong 😳" : ""}
        </p>
    </div>
  )
}

export default SignUp