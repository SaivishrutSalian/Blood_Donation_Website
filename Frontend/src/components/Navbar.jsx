import { Link } from 'react-scroll';

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Glassmorphism effect with top border */}
      <div className="border-t-4 border-red-600 bg-white/10 backdrop-blur-lg shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-24 px-6 lg:px-8">
            {/* Logo with modern hover effect */}
            <div className="relative overflow-hidden rounded-xl">
              <img 
                src="/logo1.png" 
                alt="Logo" 
                className="w-[90px] h-auto md:w-[120px] transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-10">
              <Link 
                to="hero" 
                smooth={true} 
                duration={800} 
                className="group relative px-2 py-1 cursor-pointer"
              >
                <span className="relative z-10 text-white text-[17px] font-medium tracking-wide transition-colors duration-300 group-hover:text-red-400 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-red-400 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 group-hover:after:scale-x-100">Home</span>
              </Link>
              
              <Link 
                to="featured" 
                smooth={true} 
                duration={800} 
                className="group relative px-2 py-1 cursor-pointer"
              >
                <span className="relative z-10 text-white text-[17px] font-medium tracking-wide transition-colors duration-300 group-hover:text-red-400 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-red-400 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 group-hover:after:scale-x-100">About Us</span>
              </Link>

              <Link 
                to="contact" 
                smooth={true} 
                duration={800} 
                className="relative group cursor-pointer"
              >
                <span className="relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-300 bg-gradient-to-r from-red-600 to-red-500 rounded-full hover:from-red-500 hover:to-red-600 group-hover:scale-105">
                  Contact Us
                  <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-500 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              </Link>
            </nav>

            {/* Mobile menu button with improved design */}
            <div className="md:hidden">
              <button className="relative group p-3 rounded-lg border border-white/20 hover:border-red-500/50 transition-colors duration-300">
                <svg className="w-6 h-6 text-white group-hover:text-red-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <div className="absolute inset-0 bg-white/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;