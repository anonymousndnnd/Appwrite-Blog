import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-blue-50 text-blue-900 border-t border-blue-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="Notes Keeper Logo"
                className="w-[70px] h-[70px] rounded-full object-cover border-2 border-blue-300 shadow"
              />
              <div>
                <h2 className="text-xl font-bold text-blue-800">Blog Verse</h2>
                <p className="text-sm text-blue-600">Capture Ideas. Keep Them Forever.</p>
              </div>
            </div>
            <p className="text-sm text-blue-600">
              &copy; {new Date().getFullYear()} Notes Keeper. All Rights Reserved.
            </p>
            <div className="flex space-x-4 text-xl">
              {['🐦', '💻', '🔗'].map((icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="text-blue-400 hover:text-blue-600 transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-blue-700 mb-4">Company</h3>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Affiliate Program', 'Press Kit'].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="text-blue-600 hover:text-blue-800 transition-all duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-blue-700 mb-4">Support</h3>
            <ul className="space-y-2">
              {['Account', 'Help', 'Contact Us', 'Customer Support'].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="text-blue-600 hover:underline hover:text-blue-800"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-blue-700 mb-4">Legals</h3>
            <ul className="space-y-2">
              {['Terms & Conditions', 'Privacy Policy', 'Licensing'].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="text-blue-600 hover:text-blue-800 relative before:absolute before:-left-2 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-blue-400 before:rounded-full before:opacity-0 hover:before:opacity-100 transition-all"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-blue-200 text-center">
          <p className="text-sm text-blue-500 hover:text-blue-700 transition-colors duration-300">
            Built with 💙 by <span className="font-semibold">Saurav</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
