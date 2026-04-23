import AnimateOnScroll from './AnimateOnScroll'
import { HiLocationMarker, HiHeart } from 'react-icons/hi'
import { IoBedOutline, IoWaterOutline } from 'react-icons/io5'
import { BiArea } from 'react-icons/bi'
import { properties } from '../data/properties'

function PropertyCard({ property }) {
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(property.price)

  return (
    <div className='bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group'>
      {/* Image */}
      <div className='relative overflow-hidden h-56'>
        <img
          src={property.image}
          alt={property.title}
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
        />
        {/* Badge */}
        <span
          className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${property.type === 'For Rent' ? 'bg-blue-500 text-white' : 'bg-brown text-white'}`}
        >
          {property.type}
        </span>
        {/* Favorite */}
        <button className='absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-50 transition-colors duration-200'>
          <HiHeart
            className='text-gray-400 hover:text-red-500 transition-colors duration-200'
            size={18}
          />
        </button>
      </div>

      {/* Details */}
      <div className='p-5'>
        <h3 className='text-gray-900 font-bold text-lg leading-snug'>
          {property.title}
        </h3>
        <div className='flex items-center gap-1 mt-1 text-gray-500 text-sm'>
          <HiLocationMarker className='text-brown' size={16} />
          <span>{property.location}</span>
        </div>

        {/* Features */}
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

        {/* Price & CTA */}
        <div className='flex items-center justify-between mt-4'>
          <p className='text-brown-dark font-extrabold text-lg'>
            {formattedPrice}
          </p>
          <button className='bg-brown text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-brown-dark transition-all duration-200'>
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}

function FeaturedListings() {
  return (
    <section className='bg-gray-50 py-20 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
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

        {/* Grid */}
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
        {/* CTA */}
        <AnimateOnScroll>
          <div className='text-center mt-12'>
            <button className='bg-brown text-white font-semibold px-8 py-3 rounded-xl hover:bg-brown-dark transition-all duration-200'>
              View All Listings
            </button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

export default FeaturedListings
