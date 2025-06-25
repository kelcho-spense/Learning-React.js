import { Link } from '@tanstack/react-router'
import { PenTool } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className=" flex-shrink-0 flex items-center text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
              <PenTool className="h-8 w-8 text-blue-600" />
              BlogSpace
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/features"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              activeProps={{ className: 'text-blue-600' }}
            >
              Features
            </Link>
            <Link
              to="/blogs"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              activeProps={{ className: 'text-blue-600' }}
            >
              Blogs
            </Link>
            <Link
              to="/categories"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              activeProps={{ className: 'text-blue-600' }}
            >
              Categories
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              activeProps={{ className: 'text-blue-600' }}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              activeProps={{ className: 'text-blue-600' }}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/write"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Write Post
            </Link>
            <Link
              to="/login"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex items-center text-gray-700 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors px-2 py-1"
                activeProps={{ className: 'text-blue-600' }}
              >
                Home
              </Link>
              <Link
                to="/blogs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors px-2 py-1"
                activeProps={{ className: 'text-blue-600' }}
              >
                Blog
              </Link>
              <Link
                to="/categories"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors px-2 py-1"
                activeProps={{ className: 'text-blue-600' }}
              >
                Categories
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors px-2 py-1"
                activeProps={{ className: 'text-blue-600' }}
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors px-2 py-1"
                activeProps={{ className: 'text-blue-600' }}
              >
                Contact
              </Link>

              {/* Mobile CTA Buttons */}
              <div className="border-t border-gray-200 pt-3 mt-3 space-y-3">
                <Link
                  to="/write"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
                >
                  Write Post
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-gray-900 font-medium transition-colors text-center px-4 py-2"
                >
                  Sign In
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
