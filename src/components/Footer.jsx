import { Link } from 'react-router-dom'
import { HiLocationMarker, HiPhone, HiMail } from 'react-icons/hi'
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa'

const footerLinks = {
  Company: ['About Us', 'Careers', 'Blog', 'Press'],
  Properties: ['For Sale', 'For Rent', 'New Developments', 'Commercial'],
  Support: ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'],
}

function Footer() {
  return (
    <footer className='bg-gray-900 text-gray-400'>
      {/* Main Footer */}
      <div className='max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10'>
        {/* Brand Column */}
        <div className='lg:col-span-2'>
          <span className='text-2xl font-extrabold text-white'>
            Home<span className='text-brown-light'>naija</span>
          </span>
          <p className='mt-4 text-sm leading-relaxed max-w-xs'>
            Nigeria's most trusted property platform. Connecting buyers, sellers
            and renters across the country since 2016.
          </p>

          {/* Contact Info */}
          <div className='mt-6 space-y-3 text-sm'>
            <div className='flex items-center gap-2'>
              <HiLocationMarker
                className='text-brown-light flex-shrink-0'
                size={18}
              />
              <span>14 Admiralty Way, Lekki Phase 1, Lagos</span>
            </div>
            <div className='flex items-center gap-2'>
              <HiPhone className='text-brown-light flex-shrink-0' size={18} />
              <span>+234 801 234 5678</span>
            </div>
            <div className='flex items-center gap-2'>
              <HiMail className='text-brown-light flex-shrink-0' size={18} />
              <span>hello@homenaija.com</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className='flex items-center gap-3 mt-7'>
            {[
              { icon: <FaFacebookF size={14} />, label: 'Facebook' },
              { icon: <FaTwitter size={14} />, label: 'Twitter' },
              { icon: <FaInstagram size={14} />, label: 'Instagram' },
              { icon: <FaLinkedinIn size={14} />, label: 'LinkedIn' },
            ].map((social) => (
              <a
                key={social.label}
                href='#'
                aria-label={social.label}
                className='w-9 h-9 bg-gray-800 hover:bg-brown rounded-full flex items-center justify-center transition-colors duration-200'
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links Columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <h4 className='text-white font-bold text-sm uppercase tracking-widest mb-5'>
              {heading}
            </h4>
            <ul className='space-y-3'>
              {links.map((link) => (
                <li key={link}>
                  <a
                    href='#'
                    className='text-sm hover:text-brown-light transition-colors duration-200'
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Newsletter */}
      <div className='border-t border-gray-800'>
        <div className='max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6'>
          <div>
            <h4 className='text-white font-bold text-lg'>Stay Updated</h4>
            <p className='text-sm mt-1'>
              Get the latest property listings delivered to your inbox.
            </p>
          </div>
          <div className='flex w-full md:w-auto'>
            <input
              type='email'
              placeholder='Enter your email address'
              className='flex-1 md:w-72 px-4 py-3 bg-gray-800 text-white text-sm rounded-l-xl outline-none placeholder-gray-500 border border-gray-700 focus:border-brown transition-colors duration-200'
            />
            <button className='bg-brown hover:bg-brown-dark text-white text-sm font-semibold px-6 py-3 rounded-r-xl transition-all duration-200'>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-gray-800'>
        <div className='max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs'>
          <p>© {new Date().getFullYear()} Homenaija. All rights reserved.</p>
          <div className='flex items-center gap-4'>
            <p>Built for Nigerians</p>
            <Link
              to='/admin'
              className='text-gray-700 hover:text-gray-500 transition-colors duration-200 text-xs'
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
