import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import { HiSearch, HiLocationMarker, HiHeart } from 'react-icons/hi'
import { IoBedOutline, IoWaterOutline } from 'react-icons/io5'
import { BiArea } from 'react-icons/bi'

function PropertyCard({ property }) {
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
        <button className='absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-50 transition-colors duration-200'>
          <HiHeart
            className='text-gray-400 hover:text-red-500 transition-colors duration-200'
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

function Listings() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [type, setType] = useState('All')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const location = useLocation()

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'properties'))
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setProperties(data)
      } catch (error) {
        console.error('Error fetching properties:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProperties()
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const searchQuery = params.get('search')
    if (searchQuery) {
      setSearch(searchQuery)
    }
  }, [location.search])

  const filtered = properties.filter((p) => {
    const matchSearch =
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.title.toLowerCase().includes(search.toLowerCase())
    const matchType = type === 'All' || p.type === type
    const matchMin = minPrice === '' || p.price >= Number(minPrice)
    const matchMax = maxPrice === '' || p.price <= Number(maxPrice)
    return matchSearch && matchType && matchMin && matchMax
  })

  return (
    <div className='min-h-screen bg-gray-50 pt-24 pb-16 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-10'>
          <h1 className='text-3xl sm:text-4xl font-extrabold text-gray-900'>
            Browse Properties
          </h1>
          <p className='text-gray-500 mt-2'>
            {filtered.length} properties found across Nigeria
          </p>
        </div>

        {/* Filters */}
        <div className='bg-white rounded-2xl shadow-md p-6 mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          <div className='relative'>
            <HiSearch
              className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
              size={18}
            />
            <input
              type='text'
              placeholder='Search location or title...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-brown transition-colors duration-200'
            />
          </div>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className='w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-brown transition-colors duration-200 text-gray-700'
          >
            <option value='All'>All Types</option>
            <option value='For Sale'>For Sale</option>
            <option value='For Rent'>For Rent</option>
          </select>
          <input
            type='number'
            placeholder='Min Price (₦)'
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className='w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-brown transition-colors duration-200'
          />
          <input
            type='number'
            placeholder='Max Price (₦)'
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className='w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-brown transition-colors duration-200'
          />
        </div>

        {/* Grid */}
        {loading ? (
          <div className='flex justify-center py-20'>
            <div className='w-10 h-10 border-4 border-brown border-t-transparent rounded-full animate-spin' />
          </div>
        ) : filtered.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className='text-center py-20'>
            <p className='text-gray-400 text-xl font-semibold'>
              No properties found
            </p>
            <p className='text-gray-400 text-sm mt-2'>
              Try adjusting your search filters
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Listings
