import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")

  const login = async (data) => {
    setError("")
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) {
          dispatch(authLogin(userData));
          sessionStorage.setItem("loginRefreshed", "true")
        window.location.reload()
        }
        navigate("/")
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
        <div className="mb-6 flex justify-center">
          <span className="inline-block w-full max-w-[120px]">
            <img
              src="logo.png"
              alt="Blog Logo"
              className="w-[70px] h-[70px] rounded-full object-cover border-2 border-blue-300 shadow-sm hover:opacity-90 transition-opacity duration-200"
             />
          </span>
        </div>
        
        <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-2">Welcome back</h2>
        <p className="text-center text-gray-600 mb-6">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:text-blue-700 transition"
          >
            Sign up
          </Link>
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm text-center shadow-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(login)}>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Email address
              </label>
              <Input
                placeholder="Enter your email"
                type="email"
                className="w-full px-4 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                      "Email address must be valid",
                  },
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                {...register("password", {
                  required: true,
                })}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition duration-200"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login