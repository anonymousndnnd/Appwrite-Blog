import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit ,formState: { errors }} = useForm()
    const [error, setError] = useState("")
    console.log("Errors are",errors);

    const create = async (data) => {
      setError("")
      try {
        const userData = await authService.createAccount(data)
        if (userData) {
          const currentUser = await authService.getCurrentUser()
          if (currentUser) {
            dispatch(login(currentUser));
            navigate("/")
          }
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
        
        <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-2">Create your account</h2>
        <p className="text-center text-gray-600 mb-6">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-700 transition"
          >
            Sign in
          </Link>
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm text-center shadow-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Full Name
              </label>
              <Input
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                {...register("name", {
                  required: true,
                })}
              />
              {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Email address
              </label>
              <Input
                placeholder="Enter your email"
                type="email"
                className="w-full px-4 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                {...register("email", {
                  required: "Email is required",
                  validate: {
                    matchPattern: (value) =>
                      /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                      "Email address must be valid",
                  },
                })}
              />
              {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
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
              {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
            )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition duration-200"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup