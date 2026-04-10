import { Link } from 'react-router-dom'
import { HiHeart, HiLocationMarker } from 'react-icons/hi'
import { IoBedOutline, IoWaterOutline } from 'react-icons/io5'
import { BiArea } from 'react-icons/bi'
import { properties } from '../data/properties'

// For now we'll show first 3 properties as "saved" - Firebase will handle real saved properties later
const savedProperties = properties.slice(0, 3)

function SavedProperties() {
  return (
    <div className='min-h-screen bg-gray-50 pt-24 pb-16 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-10'>
          <h1 className='text-3xl sm:text-4xl font-extrabold text-gray-900'>
            Saved Properties
          </h1>
          <p className='text-gray-500 mt-2'>
            {savedProperties.length} properties saved
          </p>
        </div>

        {savedProperties.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {savedProperties.map((property) => {
              const formattedPrice = new Intl.NumberFormat('en-NG', {
                style: 'currency',
                currency: 'NGN',
                maximumFractionDigits: 0,
              }).format(property.price)

              return (
                <div
                  key={property.id}
                  className='bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group'
                >
                  {/* Image */}
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
                    {/* Remove from saved */}
                    <button className='absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-50 transition-colors duration-200'>
                      <HiHeart className='text-red-500' size={18} />
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
                      <Link to={`/property/${property.id}`}>
                        <button className='bg-brown text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-brown-dark transition-all duration-200'>
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* Empty State */
          <div className='flex flex-col items-center justify-center py-24 text-center'>
            <div className='w-20 h-20 bg-brown/10 rounded-full flex items-center justify-center mb-6'>
              <HiHeart className='text-brown' size={36} />
            </div>
            <h2 className='text-2xl font-bold text-gray-900'>
              No Saved Properties
            </h2>
            <p className='text-gray-500 mt-2 max-w-sm'>
              You haven't saved any properties yet. Browse listings and tap the
              heart icon to save your favorites.
            </p>
            <Link to='/listings'>
              <button className='mt-6 bg-brown text-white font-semibold px-8 py-3 rounded-xl hover:bg-brown-dark transition-all duration-200'>
                Browse Properties
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default SavedProperties
