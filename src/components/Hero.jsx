import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import heroImg from '../assets/hero-bg.jpg'
import { HiSearch } from 'react-icons/hi'

function Hero() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/listings?search=${encodeURIComponent(search.trim())}`)
    } else {
      navigate('/listings')
    }
  }

  return (
    <section
      className='relative w-full h-screen bg-cover bg-center'
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      {/* Dark Overlay */}
      <div className='absolute inset-0 bg-black/60' />

      {/* Content */}
      <div className='relative z-10 flex flex-col items-center justify-center h-full text-center px-4'>
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='bg-brown text-white text-sm font-semibold px-4 py-1 rounded-full mb-6 tracking-wide uppercase'
        >
          Nigeria's #1 Property Platform
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className='text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight max-w-4xl'
        >
          Find Your Perfect
          <span className='text-brown-light'> Home </span>
          In Nigeria
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className='mt-4 text-gray-300 text-base sm:text-lg max-w-xl'
        >
          Thousands of verified properties across Lagos, Abuja, Port Harcourt
          and beyond. Your dream home is one search away.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className='mt-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col sm:flex-row overflow-hidden'
        >
          <input
            type='text'
            placeholder='Search by location, e.g. Lagos, Abuja...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className='flex-1 px-5 py-4 text-gray-700 outline-none text-sm sm:text-base'
          />
          <button
            onClick={handleSearch}
            className='bg-brown hover:bg-brown-dark text-white px-8 py-4 font-semibold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2'
          >
            <HiSearch size={20} />
            Search
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className='mt-12 flex flex-wrap justify-center gap-8 sm:gap-16'
        >
          {[
            { value: '5,000+', label: 'Properties Listed' },
            { value: '1,200+', label: 'Happy Clients' },
            { value: '20+', label: 'Cities Covered' },
          ].map((stat) => (
            <div key={stat.label} className='text-center'>
              <p className='text-3xl font-extrabold text-brown-light'>
                {stat.value}
              </p>
              <p className='text-gray-300 text-sm mt-1'>{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
