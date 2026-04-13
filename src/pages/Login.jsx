import toast from 'react-hot-toast'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiMail, HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi'
import { FcGoogle } from 'react-icons/fc'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'
import { auth } from '../firebase/config'

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleLogin = async () => {
    setError('')
    setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password,
      )
      toast.success(
        `Welcome back, ${userCredential.user.displayName?.split(' ')[0] || 'there'}! 👋`,
      )
      navigate('/')
    } catch (err) {
      setError('Invalid email or password. Please try again.')
    }
    setLoading(false)
  }

  const handleGoogle = async () => {
    setError('')
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      navigate('/')
    } catch (err) {
      setError('Google sign in failed. Please try again.')
    }
  }
  return (
    <div className='min-h-screen bg-gray-50 flex'>
      {/* Left - Image */}
      <div
        className='hidden lg:flex lg:w-1/2 bg-cover bg-center relative'
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200')",
        }}
      >
        <div className='absolute inset-0 bg-brown-dark/70' />
        <div className='relative z-10 flex flex-col justify-end p-12 text-white'>
          <h2 className='text-4xl font-extrabold leading-tight'>
            Find Your Perfect <br /> Home In Nigeria
          </h2>
          <p className='mt-4 text-brown-light max-w-sm'>
            Join thousands of Nigerians who have found their dream property
            through Homenaija.
          </p>
        </div>
      </div>

      {/* Right - Form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center px-6 py-12'>
        <div className='w-full max-w-md'>
          {/* Logo */}
          <Link to='/'>
            <img
              src='/src/assets/hero-g.png'
              alt='Homenaija'
              className='h-10 w-auto object-contain mix-blend-multiply mb-8'
            />
          </Link>

          <h1 className='text-3xl font-extrabold text-gray-900'>
            Welcome back
          </h1>
          <p className='text-gray-500 mt-2'>
            Sign in to your Homenaija account
          </p>

          {/* Form */}
          <div className='mt-8 space-y-4'>
            {/* Email */}
            <div className='relative'>
              <HiMail
                className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                size={20}
              />
              <input
                type='email'
                name='email'
                placeholder='Email address'
                value={form.email}
                onChange={handleChange}
                className='w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-brown transition-colors duration-200'
              />
            </div>

            {/* Password */}
            <div className='relative'>
              <HiLockClosed
                className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                size={20}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder='Password'
                value={form.password}
                onChange={handleChange}
                className='w-full pl-11 pr-11 py-3.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-brown transition-colors duration-200'
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brown'
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>

            {/* Forgot Password */}
            <div className='text-right'>
              <a
                href='#'
                className='text-sm text-brown hover:text-brown-dark font-medium'
              >
                Forgot password?
              </a>
            </div>

            {error && (
              <p className='text-red-500 text-sm text-center'>{error}</p>
            )}
            <button
              onClick={handleLogin}
              disabled={loading}
              className='w-full bg-brown text-white font-bold py-3.5 rounded-xl hover:bg-brown-dark transition-all duration-200 disabled:opacity-60'
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            {/* Divider */}
            <div className='flex items-center gap-3'>
              <div className='flex-1 h-px bg-gray-200' />
              <span className='text-gray-400 text-sm'>or continue with</span>
              <div className='flex-1 h-px bg-gray-200' />
            </div>

            {/* Google */}
            <button
              onClick={handleGoogle}
              className='w-full flex items-center justify-center gap-3 border border-gray-200 py-3.5 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-gray-700'
            >
              <FcGoogle size={22} />
              Sign in with Google
            </button>

            {/* Sign Up Link */}
            <p className='mt-8 text-center text-gray-500 text-sm'>
              Don't have an account?{' '}
              <Link
                to='/signup'
                className='text-brown font-bold hover:text-brown-dark'
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
