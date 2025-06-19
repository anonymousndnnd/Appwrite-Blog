import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ]

  return (
    <header className="bg-blue-100 py-4 shadow-md w-full">
      <Container>
        <nav className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <Link to="/">
              <img
              src="logo.png"
              alt="Blog Logo"
              className="w-[70px] h-[70px] rounded-full object-cover border-2 border-blue-300 shadow-sm hover:opacity-90 transition-opacity duration-200"
             />
            </Link>
          </div>
          <ul className="flex flex-wrap justify-center gap-x-2 gap-y-3 md:gap-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-5 py-2.5 bg-gradient-to-r from-blue-200 to-blue-300 text-blue-800 hover:from-blue-300 hover:to-blue-400 hover:text-white rounded-full shadow-sm transition-all duration-200"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header