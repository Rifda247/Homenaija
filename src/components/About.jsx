import { HiCheckCircle } from 'react-icons/hi'
import { BsBuilding, BsPeopleFill, BsAwardFill } from 'react-icons/bs'
import AnimateOnScroll from './AnimateOnScroll'

const stats = [
  {
    icon: <BsBuilding size={28} />,
    value: '5,000+',
    label: 'Properties Listed',
  },
  { icon: <BsPeopleFill size={28} />, value: '1,200+', label: 'Happy Clients' },
  { icon: <BsAwardFill size={28} />, value: '8+', label: 'Years Experience' },
]

const points = [
  'Verified and trusted property listings',
  'Coverage across 20+ cities in Nigeria',
  'Dedicated support for buyers and sellers',
  'Transparent pricing with no hidden fees',
]

function About() {
  return (
    <section className='bg-white py-20 px-4'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
        <AnimateOnScroll direction='right'>
          <div className='relative w-full h-[420px] hidden lg:block'>
            <img
              src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'
              alt='Property'
              className='absolute top-0 left-0 w-3/4 h-80 object-cover rounded-2xl shadow-xl'
            />
            <img
              src='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
              alt='Property'
              className='absolute bottom-0 right-0 w-2/3 h-64 object-cover rounded-2xl shadow-xl border-4 border-white'
            />
            <div className='absolute top-52 left-52 bg-brown text-white px-5 py-3 rounded-xl shadow-lg text-center'>
              <p className='text-2xl font-extrabold'>8+</p>
              <p className='text-xs font-medium'>Years of Trust</p>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll direction='left' delay={0.2}>
          <div>
            <span className='text-brown font-semibold text-sm uppercase tracking-widest'>
              Who We Are
            </span>
            <h2 className='text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 leading-tight'>
              Nigeria's Most Trusted <br />
              <span className='text-brown'>Property Platform</span>
            </h2>
            <p className='text-gray-500 mt-4 leading-relaxed'>
              At Homenaija, we connect Nigerians with their dream properties.
              Whether you're buying, selling or renting, we make the process
              seamless, transparent and stress-free.
            </p>
            <ul className='mt-6 space-y-3'>
              {points.map((point) => (
                <li
                  key={point}
                  className='flex items-center gap-3 text-gray-700'
                >
                  <HiCheckCircle
                    className='text-brown flex-shrink-0'
                    size={22}
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className='mt-10 grid grid-cols-3 gap-4'>
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className='bg-gray-50 rounded-xl p-4 text-center border border-gray-100'
                >
                  <div className='text-brown flex justify-center mb-2'>
                    {stat.icon}
                  </div>
                  <p className='text-2xl font-extrabold text-gray-900'>
                    {stat.value}
                  </p>
                  <p className='text-xs text-gray-500 mt-1'>{stat.label}</p>
                </div>
              ))}
            </div>
            <button className='mt-10 bg-brown text-white font-semibold px-8 py-3 rounded-xl hover:bg-brown-dark transition-all duration-200'>
              Learn More About Us
            </button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

export default About
