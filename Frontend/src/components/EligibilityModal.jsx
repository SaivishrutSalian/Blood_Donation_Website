import { useState } from "react";

const EligibilityModal = ({ isOpen, onClose }) => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("");
  const [recentDonation, setRecentDonation] = useState("");
  const [recentSurgery, setRecentSurgery] = useState("");
  const [result, setResult] = useState("");

  const checkEligibility = () => {
    const ageNum = parseInt(age);
    const weightNum = parseInt(weight);

    if (!age || !weight || !medicalCondition || !recentDonation || !recentSurgery) {
      setResult("Please fill all fields to check eligibility.");
      return;
    }

    if (ageNum < 18 || ageNum > 65) {
      setResult("You are not eligible to donate blood as age should be between 18-65 years.");
    } else if (weightNum < 50) {
      setResult("You are not eligible to donate blood as weight should be at least 50 kg.");
    } else if (medicalCondition.toLowerCase() !== "none") {
      setResult("You are not eligible to donate blood due to medical conditions.");
    } else if (recentDonation === "yes") {
      setResult("You are not eligible to donate blood as you have donated in the last 3 months.");
    } else if (recentSurgery === "yes") {
      setResult("You are not eligible to donate blood due to recent surgery or illness.");
    } else {
      setResult("Congratulations! You are eligible to donate blood.");
    }
  };

  if (!isOpen) return null;

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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Blood Donation Eligibility</h2>
          <p className="text-gray-500 text-sm">Please fill in your details to check eligibility</p>
        </div>

        <div className="space-y-6">
          {/* Age Input */}
          <div className="relative">
            <label className="text-sm font-semibold text-gray-700 mb-1 block">Age (in years)</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none"
              placeholder="Enter your age"
            />
          </div>

          {/* Weight Input */}
          <div className="relative">
            <label className="text-sm font-semibold text-gray-700 mb-1 block">Weight (in kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none"
              placeholder="Enter your weight"
            />
          </div>

          {/* Medical Conditions Input */}
          <div className="relative">
            <label className="text-sm font-semibold text-gray-700 mb-1 block">
              Medical Conditions
            </label>
            <input
              type="text"
              value={medicalCondition}
              onChange={(e) => setMedicalCondition(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none"
              placeholder="Type 'None' if no conditions"
            />
          </div>

          {/* Recent Donation Select */}
          <div className="relative">
            <label className="text-sm font-semibold text-gray-700 mb-1 block">
              Blood donation in last 3 months?
            </label>
            <select 
              value={recentDonation} 
              onChange={(e) => setRecentDonation(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none appearance-none bg-white"
            >
              <option value="">Select an option...</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <div className="absolute right-4 top-[65%] pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Recent Surgery Select */}
          <div className="relative">
            <label className="text-sm font-semibold text-gray-700 mb-1 block">
              Recent surgery or illness?
            </label>
            <select 
              value={recentSurgery} 
              onChange={(e) => setRecentSurgery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none appearance-none bg-white"
            >
              <option value="">Select an option...</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <div className="absolute right-4 top-[65%] pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Result Message */}
        {result && (
          <div className={`mt-6 p-4 rounded-lg text-center font-medium ${
            result.includes("Congratulations") 
              ? "bg-green-50 text-green-700 border border-green-200" 
              : "bg-red-50 text-red-700 border border-red-200"
          }`}>
            {result}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button 
            onClick={onClose} 
            className="flex-1 px-6 py-3 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button 
            onClick={checkEligibility} 
            className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-500 hover:to-red-600 transition-all duration-200 shadow-lg shadow-red-500/30"
          >
            Check Eligibility
          </button>
        </div>
      </div>
    </div>
  );
};

export default EligibilityModal;
