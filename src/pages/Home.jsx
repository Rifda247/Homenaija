import Hero from '../components/Hero'
import FeaturedListings from '../components/FeaturedListings'
import About from '../components/About'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'

function Home() {
  return (
    <div>
      <Hero />
      <FeaturedListings />
      <About />
      <HowItWorks />
      <Testimonials />
    </div>
  )
}

export default Home
