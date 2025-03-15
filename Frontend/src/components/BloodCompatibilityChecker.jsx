// src/components/BloodCompatibilityChecker.jsx
import { useState } from "react";

const BloodCompatibilityChecker = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const bloodCompatibility = {
    "A+": ["A+", "AB+"],
    "A-": ["A+", "A-", "AB+", "AB-"],
    "B+": ["B+", "AB+"],
    "B-": ["B+", "B-", "AB+", "AB-"],
    "AB+": ["AB+"],
    "AB-": ["AB+", "AB-"],
    "O+": ["O+", "A+", "B+", "AB+"],
    "O-": ["Everyone"],
  };

  const [bloodType, setBloodType] = useState("");
  const [compatibleTypes, setCompatibleTypes] = useState([]);

  const checkCompatibility = () => {
    setCompatibleTypes(bloodCompatibility[bloodType] || []);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="bg-white/95 p-8 rounded-2xl shadow-2xl w-[450px] relative border border-gray-100">
        {/* Close button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Blood Compatibility Checker</h2>
          <p className="text-gray-500 text-sm">Select your blood type to check compatibility</p>
        </div>

        {/* Blood Type Selection */}
        <div className="relative mb-6">
          <select
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none appearance-none bg-white"
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
          >
            <option value="">Select Blood Type</option>
            {Object.keys(bloodCompatibility).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Check Button */}
        <button
          onClick={checkCompatibility}
          className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-lg 
          hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:scale-[1.02] 
          focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-lg"
        >
          Check Compatibility
        </button>

        {/* Results Section */}
        {compatibleTypes.length > 0 && (
          <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Compatible Blood Types</h3>
            <div className="flex flex-wrap gap-2">
              {compatibleTypes.map((type) => (
                <span 
                  key={type}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-full font-medium text-sm"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Info Note */}
        <p className="mt-6 text-sm text-gray-500 text-center">
          Note: This is a general guide. Please consult healthcare professionals for medical advice.
        </p>
      </div>
    </div>
  );
};

export default BloodCompatibilityChecker;
