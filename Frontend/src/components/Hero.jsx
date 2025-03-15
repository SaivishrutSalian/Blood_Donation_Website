import { Link } from 'react-scroll';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BloodCompatibilityChecker from "../components/BloodCompatibilityChecker";
import EligibilityModal from "../components/EligibilityModal";

const Hero = () => {
  const [isBloodModalOpen, setIsBloodModalOpen] = useState(false);
  const [isEligibilityModalOpen, setIsEligibilityModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative bg-[url('/hero1.jpg')] bg-no-repeat bg-cover bg-center h-screen">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="flex flex-col text-white w-full lg:w-[60%]">
          <span className="text-red-500 text-lg md:text-2xl font-bold uppercase tracking-wider mb-2">
            Donate Blood, Save Lives!
          </span>
          
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            Your Blood Can Bring a
            <span className="text-red-500"> Smile </span>
            to Someone's Life.
          </h1>
          
          <p className="text-gray-200 text-lg mb-8 max-w-2xl">
            Every drop counts. Join our mission to save lives through blood donation and make a difference in your community.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="contact" smooth={true} duration={800}>
              <button className="w-full bg-red-600 hover:bg-red-700 px-6 py-4 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition duration-300 flex items-center justify-center space-x-2">
                <span>Donate Now</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </Link>

            <button className="w-full bg-gray-800 hover:bg-gray-900 px-6 py-4 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition duration-300 flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+789865354789</span>
            </button>

            <button
              onClick={() => setIsBloodModalOpen(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-4 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
            >
              Check Blood Compatibility
            </button>

            <button
              onClick={() => navigate('/blood-availability')}
              className="w-full bg-green-600 hover:bg-green-700 px-6 py-4 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
            >
              Blood Availability
            </button>

            <button
              onClick={() => setIsEligibilityModalOpen(true)}
              className="w-full bg-yellow-600 hover:bg-yellow-700 px-6 py-4 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
            >
              Check Eligibility
            </button>
          </div>
        </div>
      </div>
      {/* Blood Compatibility Checker Modal */}
      <BloodCompatibilityChecker
        isOpen={isBloodModalOpen}
        onClose={() => setIsBloodModalOpen(false)}
      />

      {/* Eligibility Checker Modal */}
      <EligibilityModal
        isOpen={isEligibilityModalOpen}
        onClose={() => setIsEligibilityModalOpen(false)}
      />
    </div>
  );
};

export default Hero;
