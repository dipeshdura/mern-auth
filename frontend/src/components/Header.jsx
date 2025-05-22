import React from 'react'

const Header = () => {
  return (
     <div className='bg-slate-200'>
        <div className="flex justify-between items-center max-w-6xl m-auto p-3">
            <h1 className="font-bold">Auth App</h1>
            <ul className='flex gap-4'>
              <a href="/">Home</a>
              <a href="/about">About</a>
              <a href="/sign-up">SignUp</a>
              <a href="/sign-in">SignIn</a>
              <a href="/profile">Profile</a>
            </ul>
        </div>
    </div>
  )
}

export default Header