import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  collection,
  getDocs,
} from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import AnimateOnScroll from './AnimateOnScroll'
import { HiLocationMarker, HiHeart } from 'react-icons/hi'
import { IoBedOutline, IoWaterOutline } from 'react-icons/io5'
import { BiArea } from 'react-icons/bi'

function PropertyCard({ property }) {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const checkSaved = async () => {
      if (!user) return
      const ref = doc(db, 'users', user.uid, 'saved', property.id)
      const snap = await getDoc(ref)
      setSaved(snap.exists())
    }
    checkSaved()
  }, [user, property.id])

  const handleSave = async (e) => {
    e.preventDefault()
    if (!user) {
      toast.error('Please log in to save properties!')
      return
    }
    const ref = doc(db, 'users', user.uid, 'saved', property.id)
    if (saved) {
      await deleteDoc(ref)
      setSaved(false)
      toast.success('Property removed from saved!')
    } else {
      await setDoc(ref, { ...property })
      setSaved(true)
      toast.success('Property saved! ❤️')
    }
  }

  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(property.price)

  return (
    <div className='bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group'>
      <div className='relative overflow-hidden h-56'>
        <img
          src={property.image}
          alt={property.title}
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
        />
        <span
          className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${property.type === 'For Rent' ? 'bg-blue-500 text-white' : 'bg-brown text-white'}`}
        >
          {property.type}
        </span>
        <button
          onClick={handleSave}
          className='absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-50 transition-colors duration-200'
        >
          <HiHeart
            className={saved ? 'text-red-500' : 'text-gray-400'}
            size={18}
          />
        </button>
      </div>
      <div className='p-5'>
        <h3 className='text-gray-900 font-bold text-lg leading-snug'>
          {property.title}
        </h3>
        <div className='flex items-center gap-1 mt-1 text-gray-500 text-sm'>
          <HiLocationMarker className='text-brown' size={16} />
          <span>{property.location}</span>
        </div>
        <div className='flex items-center gap-4 mt-4 text-gray-600 text-sm border-t border-gray-100 pt-4'>
          <div className='flex items-center gap-1'>
            <IoBedOutline size={18} className='text-brown' />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className='flex items-center gap-1'>
            <IoWaterOutline size={18} className='text-brown' />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className='flex items-center gap-1'>
            <BiArea size={18} className='text-brown' />
            <span>{property.area} m²</span>
          </div>
        </div>
        <div className='flex items-center justify-between mt-4'>
          <p className='text-brown-dark font-extrabold text-lg'>
            {formattedPrice}
          </p>
          <Link to={`/property/${property.id}`}>
            <button className='bg-brown text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-brown-dark transition-all duration-200'>
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

function FeaturedListings() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'properties'))
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setProperties(data.slice(0, 6))
      } catch (error) {
        console.error('Error fetching properties:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProperties()
  }, [])

  return (
    <section className='bg-gray-50 py-20 px-4'>
      <div className='max-w-7xl mx-auto'>
        <AnimateOnScroll>
          <div className='text-center mb-12'>
            <span className='text-brown font-semibold text-sm uppercase tracking-widest'>
              Handpicked For You
            </span>
            <h2 className='text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2'>
              Featured Properties
            </h2>
            <p className='text-gray-500 mt-3 max-w-xl mx-auto'>
              Explore our top listed properties across Nigeria's most
              sought-after locations.
            </p>
          </div>
        </AnimateOnScroll>

        {loading ? (
          <div className='flex justify-center py-20'>
            <div className='w-10 h-10 border-4 border-brown border-t-transparent rounded-full animate-spin' />
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {properties.map((property, index) => (
              <AnimateOnScroll
                key={property.id}
                delay={index * 0.1}
                direction='up'
              >
                <PropertyCard property={property} />
              </AnimateOnScroll>
            ))}
          </div>
        )}

        <AnimateOnScroll delay={0.3}>
          <div className='text-center mt-12'>
            <Link to='/listings'>
              <button className='bg-brown text-white font-semibold px-8 py-3 rounded-xl hover:bg-brown-dark transition-all duration-200'>
                View All Listings
              </button>
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

export default FeaturedListings
