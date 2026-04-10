import { HiSearch, HiHome, HiKey } from 'react-icons/hi'

const steps = [
  {
    id: '01',
    icon: <HiSearch size={32} />,
    title: 'Search Properties',
    description:
      'Browse thousands of verified listings across Nigeria. Filter by location, price, property type and more to find exactly what you need.',
  },
  {
    id: '02',
    icon: <HiHome size={32} />,
    title: 'Schedule a Visit',
    description:
      'Found something you love? Book a physical or virtual tour at your convenience. Our agents are always ready to guide you.',
  },
  {
    id: '03',
    icon: <HiKey size={32} />,
    title: 'Close the Deal',
    description:
      'We handle the paperwork, negotiations and legalities so you can move into your new home without stress.',
  },
]

function HowItWorks() {
  return (
    <section className='bg-gray-50 py-20 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-16'>
          <span className='text-brown font-semibold text-sm uppercase tracking-widest'>
            Simple Process
          </span>
          <h2 className='text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2'>
            How It Works
          </h2>
          <p className='text-gray-500 mt-3 max-w-xl mx-auto'>
            Finding your dream property in Nigeria has never been this easy.
            Just follow these three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 relative'>
          {/* Connector Line - desktop only */}
          <div className='hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-brown-light/40 z-0' />

          {steps.map((step, index) => (
            <div
              key={step.id}
              className='relative z-10 bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 text-center group'
            >
              {/* Step Number */}
              <span className='absolute -top-4 left-1/2 -translate-x-1/2 bg-brown text-white text-xs font-bold px-3 py-1 rounded-full tracking-widest'>
                STEP {step.id}
              </span>

              {/* Icon */}
              <div className='w-16 h-16 bg-brown/10 rounded-2xl flex items-center justify-center text-brown mx-auto mt-4 group-hover:bg-brown group-hover:text-white transition-all duration-300'>
                {step.icon}
              </div>

              {/* Content */}
              <h3 className='text-xl font-bold text-gray-900 mt-6'>
                {step.title}
              </h3>
              <p className='text-gray-500 mt-3 leading-relaxed text-sm'>
                {step.description}
              </p>

              {/* Arrow for mobile */}
              {index < steps.length - 1 && (
                <div className='md:hidden flex justify-center mt-6 text-brown-light text-2xl'>
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className='mt-16 bg-brown rounded-2xl p-10 text-center text-white'>
          <h3 className='text-2xl sm:text-3xl font-extrabold'>
            Ready to Find Your Dream Home?
          </h3>
          <p className='mt-3 text-brown-light max-w-lg mx-auto'>
            Join over 1,200 Nigerians who have found their perfect property
            through Homenaija.
          </p>
          <button className='mt-6 bg-white text-brown font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition-all duration-200'>
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
