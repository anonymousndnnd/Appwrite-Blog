import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch();
  
  const logOutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    })
  }

  return (
    <button 
      className="px-5 py-2.5 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-full hover:from-red-500 hover:to-red-600 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
      onClick={logOutHandler}
    >
      Logout
    </button>
  )
}

export default LogoutBtn