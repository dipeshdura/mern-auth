import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Header = () => {
  const {currentUser} =useSelector((state)=>state.user);

  
  return (
     <div className='bg-slate-200'>
        <div className="flex justify-between items-center max-w-6xl m-auto p-3">
            <h1 className="font-bold">Auth App</h1>
            <ul className='flex gap-4'>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>

              {currentUser ? (
                <Link to={`/profile/${currentUser?._id || currentUser?.user?._id}`}>
                 <img src={currentUser?.profilePicture || currentUser?.user?.profilePicture} alt="profile" className='h-7 w-7 rounded-full object-cover' />
                </Link>
              ):(
                <Link to={"/sign-in"}>Sign In </Link>
              )}
             
            </ul>
        </div>
    </div>
  )
}

export default Header