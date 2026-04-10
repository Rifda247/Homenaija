import { useParams, Link } from 'react-router-dom'
import {
  HiLocationMarker,
  HiHeart,
  HiArrowLeft,
  HiPhone,
  HiMail,
} from 'react-icons/hi'
import { IoBedOutline, IoWaterOutline } from 'react-icons/io5'
import { BiArea } from 'react-icons/bi'
import { properties } from '../data/properties'

function SingleProperty() {
  const { id } = useParams()
  const property = properties.find((p) => p.id === Number(id))

  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(property?.price)

  if (!property) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-2xl font-bold text-gray-900'>Property Not Found</p>
          <Link
            to='/listings'
            className='text-brown mt-4 block hover:underline'
          >
            Back to Listings
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 pt-24 pb-16 px-4'>
      <div className='max-w-6xl mx-auto'>
        {/* Back Button */}
        <Link
          to='/listings'
          className='inline-flex items-center gap-2 text-brown font-semibold mb-6 hover:text-brown-dark transition-colors duration-200'
        >
          <HiArrowLeft size={20} />
          Back to Listings
        </Link>

        {/* Main Image */}
        <div className='relative w-full h-72 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-lg'>
          <img
            src={property.image}
            alt={property.title}
            className='w-full h-full object-cover'
          />
          <span
            className={`absolute top-4 left-4 text-sm font-bold px-4 py-1.5 rounded-full ${property.type === 'For Rent' ? 'bg-blue-500 text-white' : 'bg-brown text-white'}`}
          >
            {property.type}
          </span>
          <button className='absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-red-50 transition-colors duration-200'>
            <HiHeart className='text-gray-400 hover:text-red-500' size={22} />
          </button>
        </div>

        {/* Content */}
        <div className='mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left - Details */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Title & Location */}
            <div className='bg-white rounded-2xl p-6 shadow-sm'>
              <div className='flex items-start justify-between flex-wrap gap-4'>
                <div>
                  <h1 className='text-2xl sm:text-3xl font-extrabold text-gray-900'>
                    {property.title}
                  </h1>
                  <div className='flex items-center gap-1 mt-2 text-gray-500'>
                    <HiLocationMarker className='text-brown' size={18} />
                    <span>{property.location}</span>
                  </div>
                </div>
                <p className='text-2xl font-extrabold text-brown-dark'>
                  {formattedPrice}
                </p>
              </div>

              {/* Features */}
              <div className='flex items-center gap-6 mt-6 pt-6 border-t border-gray-100 text-gray-700'>
                <div className='flex items-center gap-2'>
                  <IoBedOutline size={22} className='text-brown' />
                  <span className='font-semibold'>
                    {property.bedrooms} Bedrooms
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <IoWaterOutline size={22} className='text-brown' />
                  <span className='font-semibold'>
                    {property.bathrooms} Bathrooms
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <BiArea size={22} className='text-brown' />
                  <span className='font-semibold'>{property.area} m²</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className='bg-white rounded-2xl p-6 shadow-sm'>
              <h2 className='text-xl font-bold text-gray-900 mb-3'>
                Description
              </h2>
              <p className='text-gray-500 leading-relaxed'>
                This stunning {property.title.toLowerCase()} is located in the
                heart of {property.location}. Featuring {property.bedrooms}{' '}
                spacious bedrooms and {property.bathrooms} modern bathrooms,
                this property offers the perfect blend of comfort and luxury.
                With a total area of {property.area} m², there is plenty of
                space for the whole family. The property is in excellent
                condition and ready for immediate occupancy.
              </p>
              <p className='text-gray-500 leading-relaxed mt-3'>
                Located in one of Nigeria's most sought-after neighbourhoods,
                this property offers easy access to schools, shopping centres,
                hospitals and major road networks. Don't miss this incredible
                opportunity!
              </p>
            </div>

            {/* Amenities */}
            <div className='bg-white rounded-2xl p-6 shadow-sm'>
              <h2 className='text-xl font-bold text-gray-900 mb-4'>
                Amenities
              </h2>
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
                {[
                  'Swimming Pool',
                  'Parking Space',
                  'Security',
                  '24/7 Power',
                  'Water Supply',
                  'Garden',
                  'Internet',
                  'Air Conditioning',
                  'Modern Kitchen',
                ].map((amenity) => (
                  <div
                    key={amenity}
                    className='flex items-center gap-2 text-gray-600 text-sm'
                  >
                    <div className='w-2 h-2 bg-brown rounded-full flex-shrink-0' />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Contact Card */}
          <div className='space-y-6'>
            <div className='bg-white rounded-2xl p-6 shadow-sm sticky top-24'>
              <h2 className='text-lg font-bold text-gray-900 mb-4'>
                Contact Agent
              </h2>

              {/* Agent Info */}
              <div className='flex items-center gap-3 mb-6'>
                <img
                  src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'
                  alt='Agent'
                  className='w-14 h-14 rounded-full object-cover'
                />
                <div>
                  <p className='font-bold text-gray-900'>Chukwuemeka Obi</p>
                  <p className='text-gray-500 text-sm'>Senior Property Agent</p>
                </div>
              </div>

              {/* Contact Form */}
              <div className='space-y-3'>
                <input
                  type='text'
                  placeholder='Your Name'
                  className='w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-brown transition-colors duration-200'
                />
                <input
                  type='email'
                  placeholder='Your Email'
                  className='w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-brown transition-colors duration-200'
                />
                <input
                  type='tel'
                  placeholder='Your Phone Number'
                  className='w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-brown transition-colors duration-200'
                />
                <textarea
                  rows={4}
                  placeholder='I am interested in this property...'
                  className='w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-brown transition-colors duration-200 resize-none'
                />
                <button className='w-full bg-brown text-white font-semibold py-3 rounded-xl hover:bg-brown-dark transition-all duration-200'>
                  Send Message
                </button>
              </div>

              {/* Direct Contact */}
              <div className='mt-4 space-y-2'>
                <a
                  href='tel:+2348012345678'
                  className='flex items-center gap-2 text-gray-600 text-sm hover:text-brown transition-colors duration-200'
                >
                  <HiPhone className='text-brown' size={18} />
                  +234 801 234 5678
                </a>
                <a
                  href='mailto:agent@homenaija.com'
                  className='flex items-center gap-2 text-gray-600 text-sm hover:text-brown transition-colors duration-200'
                >
                  <HiMail className='text-brown' size={18} />
                  agent@homenaija.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProperty
