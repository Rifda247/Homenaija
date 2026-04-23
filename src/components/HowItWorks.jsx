import { HiStar } from 'react-icons/hi'
import { FaQuoteLeft } from 'react-icons/fa'
import AnimateOnScroll from './AnimateOnScroll'

const testimonials = [
  {
    id: 1,
    name: 'Chioma Okafor',
    location: 'Lagos',
    role: 'First-time Homebuyer',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200',
    review:
      'Homenaija made buying my first home so easy. I found my dream apartment in Lekki within two weeks. The process was smooth and transparent from start to finish!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Emeka Nwosu',
    location: 'Abuja',
    role: 'Property Investor',
    image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=200',
    review:
      'As a property investor, I need a platform I can trust. Homenaija has never let me down. Every listing is verified and the team is always available to help.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Fatima Aliyu',
    location: 'Port Harcourt',
    role: 'Renter',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200',
    review:
      'I relocated from Kano to Port Harcourt for work and found a beautiful apartment through Homenaija in just days. I cannot recommend this platform enough!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Tunde Adeyemi',
    location: 'Ibadan',
    role: 'Property Seller',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    review:
      'I listed my property on Homenaija and got serious buyers within the first week. The platform is professional and the exposure is incredible. Highly recommended!',
    rating: 5,
  },
]

function StarRating({ count }) {
  return (
    <div className='flex items-center gap-0.5'>
      {Array.from({ length: count }).map((_, i) => (
        <HiStar key={i} className='text-yellow-400' size={18} />
      ))}
    </div>
  )
}

function Testimonials() {
  return (
    <section className='bg-white py-20 px-4'>
      <div className='max-w-7xl mx-auto'>
        <AnimateOnScroll>
          <div className='text-center mb-14'>
            <span className='text-brown font-semibold text-sm uppercase tracking-widest'>
              What People Say
            </span>
            <h2 className='text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2'>
              Trusted by Nigerians
            </h2>
            <p className='text-gray-500 mt-3 max-w-xl mx-auto'>
              Don't just take our word for it. Here's what our happy clients
              have to say about Homenaija.
            </p>
          </div>
        </AnimateOnScroll>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {testimonials.map((t, index) => (
            <AnimateOnScroll key={t.id} delay={index * 0.1} direction='up'>
              <div className='bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between'>
                <div>
                  <FaQuoteLeft className='text-brown/30' size={28} />
                  <p className='text-gray-600 text-sm mt-3 leading-relaxed'>
                    {t.review}
                  </p>
                </div>
                <div className='mt-4'>
                  <StarRating count={t.rating} />
                </div>
                <div className='flex items-center gap-3 mt-5 pt-5 border-t border-gray-200'>
                  <img
                    src={t.image}
                    alt={t.name}
                    className='w-11 h-11 rounded-full object-cover'
                  />
                  <div>
                    <p className='text-gray-900 font-bold text-sm'>{t.name}</p>
                    <p className='text-gray-400 text-xs'>
                      {t.role} · {t.location}
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
