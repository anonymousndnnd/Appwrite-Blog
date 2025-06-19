import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)
  console.log(import.meta.env.VITE_APPWRITE_URL);

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
          if (sessionStorage.getItem("loginRefreshed")) {
          sessionStorage.removeItem("loginRefreshed")
        }
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-col bg-blue-50 text-blue-900'> {/* Slate-900 */}
      {/* Header with subtle gradient */}
      <header className='bg-blue-100 shadow-md sticky top-0 z-50'>
        <Header />
      </header>

      {/* Main content area */}
      <main className='flex-grow w-full'>
  
  <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10'>
    <Outlet />
  </div>
</main>


      {/* Footer with darker shade */}
      <footer className='bg-blue-100 border-t border-blue-200'>
        <Footer />
      </footer>
    </div>
  ) : (
    // Loading spinner with matching theme
    <div className='min-h-screen flex items-center justify-center bg-blue-50'>
      <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400'></div>
    </div>
  )
}

export default App