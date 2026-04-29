import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiMenuAlt3, HiX, HiUser, HiHeart, HiLogout } from 'react-icons/hi'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/config'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Listings', href: '/listings' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ]

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
    setShowDropdown(false)
  }

  return (
    <nav className='w-full bg-white shadow-sm fixed top-0 left-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <span className='text-2xl font-extrabold text-brown-dark'>
              Home<span className='text-brown-light'>naija</span>
            </span>
          </div>
          {/* Desktop Nav Links */}
          <div className='hidden md:flex items-center gap-8'>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className='text-gray-700 hover:text-brown font-medium transition-colors duration-200'
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className='hidden md:flex items-center gap-3'>
            {user ? (
              <div className='relative'>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className='flex items-center gap-2 px-4 py-2 bg-brown/10 rounded-xl hover:bg-brown/20 transition-all duration-200'
                >
                  <div className='w-8 h-8 bg-brown rounded-full flex items-center justify-center text-white font-bold text-sm'>
                    {user.displayName ? (
                      user.displayName.charAt(0).toUpperCase()
                    ) : (
                      <HiUser size={16} />
                    )}
                  </div>
                  <span className='text-brown-dark font-semibold text-sm'>
                    {user.displayName
                      ? user.displayName.split(' ')[0]
                      : 'Account'}
                  </span>
                </button>

                {/* Dropdown */}
                {showDropdown && (
                  <div className='absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50'>
                    <Link
                      to='/saved'
                      onClick={() => setShowDropdown(false)}
                      className='flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-brown transition-colors duration-200 text-sm'
                    >
                      <HiHeart size={18} className='text-brown' />
                      Saved Properties
                    </Link>
                    <hr className='my-1 border-gray-100' />
                    <button
                      onClick={handleLogout}
                      className='w-full flex items-center gap-2 px-4 py-2.5 text-red-500 hover:bg-red-50 transition-colors duration-200 text-sm'
                    >
                      <HiLogout size={18} />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to='/login'>
                  <button className='px-4 py-2 text-brown-dark font-semibold border-2 border-brown rounded-lg hover:bg-brown hover:text-white transition-all duration-200'>
                    Log In
                  </button>
                </Link>
                <Link to='/signup'>
                  <button className='px-4 py-2 bg-brown text-white font-semibold rounded-lg hover:bg-brown-dark transition-all duration-200'>
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='text-brown-dark focus:outline-none'
            >
              {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden bg-white border-t border-gray-100 px-4 pb-4'>
          <div className='flex flex-col gap-3 mt-3'>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className='text-gray-700 hover:text-brown font-medium transition-colors duration-200 py-1'
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <div className='flex flex-col gap-2 mt-2 border-t border-gray-100 pt-3'>
                <p className='text-gray-900 font-bold'>
                  Hi,{' '}
                  {user.displayName ? user.displayName.split(' ')[0] : 'there'}!
                </p>
                <Link
                  to='/saved'
                  onClick={() => setIsOpen(false)}
                  className='flex items-center gap-2 text-gray-700 hover:text-brown text-sm'
                >
                  <HiHeart size={18} className='text-brown' />
                  Saved Properties
                </Link>
                <button
                  onClick={handleLogout}
                  className='flex items-center gap-2 text-red-500 text-sm mt-1'
                >
                  <HiLogout size={18} />
                  Log Out
                </button>
              </div>
            ) : (
              <div className='flex flex-col gap-2 mt-2'>
                <Link to='/login' onClick={() => setIsOpen(false)}>
                  <button className='w-full px-4 py-2 text-brown-dark font-semibold border-2 border-brown rounded-lg hover:bg-brown hover:text-white transition-all duration-200'>
                    Log In
                  </button>
                </Link>
                <Link to='/signup' onClick={() => setIsOpen(false)}>
                  <button className='w-full px-4 py-2 bg-brown text-white font-semibold rounded-lg hover:bg-brown-dark transition-all duration-200'>
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
