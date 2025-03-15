import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <img 
              src="/logo1.png" 
              alt="BloodBridge Logo" 
              className="h-16 w-auto mb-4 hover:opacity-90 transition-opacity"
            />
            <p className="text-gray-600 leading-relaxed mb-6">
              Saving lives, one donation at a time. Join us in our mission to make blood donation accessible to everyone in need.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons with Hover Effects */}
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12.08c0-5.522-4.477-10-10-10S2 6.558 2 12.08c0 4.411 3.07 8.083 7.305 9.27.535.098.73-.233.73-.518 0-.255-.009-.933-.014-1.832-2.97.647-3.595-1.433-3.595-1.433-.486-1.235-1.187-1.564-1.187-1.564-.97-.663.073-.65.073-.65 1.07.074 1.635 1.106 1.635 1.106.953 1.634 2.502 1.162 3.113.889.098-.695.373-1.163.68-1.43-2.373-.271-4.868-1.188-4.868-5.288 0-1.168.417-2.124 1.1-2.874-.111-.271-.478-1.363.104-2.842 0 0 .9-.288 2.95 1.095.856-.241 1.774-.36 2.688-.364.914.004 1.832.123 2.688.364 2.047-1.384 2.946-1.095 2.946-1.095.584 1.48.217 2.572.106 2.842.685.75 1.1 1.706 1.1 2.874 0 4.111-2.498 5.014-4.878 5.281.384.33.726.983.726 1.98 0 1.429-.013 2.583-.013 2.933 0 .287.193.62.735.515C18.93 20.16 22 16.491 22 12.08z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.23 5.924c-.813.36-1.684.603-2.598.711a4.517 4.517 0 001.984-2.486c-.867.514-1.826.888-2.847 1.09a4.503 4.503 0 00-7.673 4.106 12.78 12.78 0 01-9.292-4.71 4.501 4.501 0 001.392 6.008 4.482 4.482 0 01-2.044-.563v.057a4.504 4.504 0 003.605 4.416 4.515 4.515 0 01-2.036.077 4.506 4.506 0 004.205 3.127 9.034 9.034 0 01-5.602 1.932c-.363 0-.722-.021-1.079-.064a12.765 12.765 0 006.917 2.027c8.304 0 12.847-6.878 12.847-12.847 0-.195-.004-.39-.014-.583a9.183 9.183 0 002.252-2.343c-.825.367-1.71.614-2.63.723a4.518 4.518 0 001.979-2.495z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.5 0h-19A2.5 2.5 0 000 2.5v19A2.5 2.5 0 002.5 24h10.156v-8.797H9.548v-3.23h3.108V9.03c0-3.067 1.872-4.736 4.605-4.736 1.31 0 2.435.097 2.76.14v3.202l-1.897.001c-1.49 0-1.779.708-1.779 1.747v2.289h3.557l-.464 3.23h-3.093V24H21.5a2.5 2.5 0 002.5-2.5v-19A2.5 2.5 0 0021.5 0z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { text: "Home", href: "#" },
                { text: "About Us", href: "#" },
                { text: "Donate", href: "#" },
                { text: "Contact", href: "#" },
                { text: "Admin", to: "/login" }
              ].map((link, index) => (
                <li key={index}>
                  {link.to ? (
                    <Link 
                      to={link.to}
                      className="text-gray-600 hover:text-red-500 transition-colors flex items-center group"
                    >
                      <span className="transform group-hover:translate-x-2 transition-transform">
                        {link.text}
                      </span>
                    </Link>
                  ) : (
                    <a 
                      href={link.href}
                      className="text-gray-600 hover:text-red-500 transition-colors flex items-center group"
                    >
                      <span className="transform group-hover:translate-x-2 transition-transform">
                        {link.text}
                      </span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-red-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <p className="text-gray-600">123 BloodConnect Ave,<br/>City, Country</p>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <p className="text-gray-600">(123) 456-7890</p>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <p className="text-gray-600">info@bloodbridge.com</p>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Newsletter</h3>
            <p className="text-gray-600 mb-4">Subscribe to our newsletter for updates and news.</p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold py-3 rounded-lg 
                hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} BloodBridge. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
