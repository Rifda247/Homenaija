import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiMail, HiLockClosed, HiEye, HiEyeOff, HiUser } from 'react-icons/hi'
import { FcGoogle } from 'react-icons/fc'
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/config'

function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSignup = async () => {
    setError('')
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password,
      )
      await updateProfile(userCredential.user, { displayName: form.name })
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: form.name,
        email: form.email,
        role: 'user',
        createdAt: new Date(),
      })
      navigate('/')
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please log in.')
      } else {
        setError('Something went wrong. Please try again.')
      }
    }
    setLoading(false)
  }

  const handleGoogle = async () => {
    setError('')
    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      await setDoc(
        doc(db, 'users', userCredential.user.uid),
        {
          name: userCredential.user.displayName,
          email: userCredential.user.email,
          role: 'user',
          createdAt: new Date(),
        },
        { merge: true },
      )
      navigate('/')
    } catch (err) {
      setError('Google sign up failed. Please try again.')
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 flex'>
      {/* Left - Image */}
      <div
        className='hidden lg:flex lg:w-1/2 bg-cover bg-center relative'
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1582407947304-fd86f28f1b8a?w=1200')",
        }}
      >
        <div className='absolute inset-0 bg-brown-dark/70' />
        <div className='relative z-10 flex flex-col justify-end p-12 text-white'>
          <h2 className='text-4xl font-extrabold leading-tight'>
            Start Your <br /> Property Journey Today
          </h2>
          <p className='mt-4 text-brown-light max-w-sm'>
            Create a free account and get access to thousands of verified
            property listings across Nigeria.
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
            Create an account
          </h1>
          <p className='text-gray-500 mt-2'>Join Homenaija for free today</p>

          {/* Form */}
          <div className='mt-8 space-y-4'>
            {/* Full Name */}
            <div className='relative'>
              <HiUser
                className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                size={20}
              />
              <input
                type='text'
                name='name'
                placeholder='Full name'
                value={form.name}
                onChange={handleChange}
                className='w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-brown transition-colors duration-200'
              />
            </div>

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
                placeholder='Create a password'
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

            {/* Terms */}
            <div className='flex items-start gap-3'>
              <input type='checkbox' id='terms' className='mt-1 accent-brown' />
              <label htmlFor='terms' className='text-sm text-gray-500'>
                I agree to the{' '}
                <a href='#' className='text-brown font-medium hover:underline'>
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href='#' className='text-brown font-medium hover:underline'>
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit */}
            {error && (
              <p className='text-red-500 text-sm text-center'>{error}</p>
            )}
            <button
              onClick={handleSignup}
              disabled={loading}
              className='w-full bg-brown text-white font-bold py-3.5 rounded-xl hover:bg-brown-dark transition-all duration-200 disabled:opacity-60'
            >
              {loading ? 'Creating account...' : 'Create Account'}
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
              Sign up with Google
            </button>
          </div>

          {/* Login Link */}
          <p className='mt-8 text-center text-gray-500 text-sm'>
            Already have an account?{' '}
            <Link
              to='/login'
              className='text-brown font-bold hover:text-brown-dark'
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
