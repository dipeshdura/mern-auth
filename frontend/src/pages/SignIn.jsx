import React, { useState } from 'react'

const SignIn = () => {
    const [formData, setFormData] =useState({});
    const handleChange=(e)=>{
       
       setFormData({
        ...formData,
        [e.target.id]:[e.target.value]
      
       })
      
       
         
    }

  return (
    <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
        <form  className="flex flex-col gap-4">
            <input
             type="email"
             placeholder="Email"
             id="email"
             className="bg-slate-100 p-3 rounded-lg"
             onChange={handleChange}
              />
            <input
             type="password"
             placeholder="Password"
             id="password"
             className="bg-slate-100 p-3 rounded-lg"
             onChange={handleChange}
              />
              <button>Sign In</button>
        </form>
        <div className="flex justify-center mx-auto gap-2 mt-5">
            <p>{"Don't Have an Account?"}</p>
            <a href="/sign-up">
                <span className="text-blue-500">Sign up</span>
            </a>
        </div>

    </div>
  )
}

export default SignIn