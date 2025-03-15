import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { publicRequest } from "../requestMethods";

const Contact = () => {
  const [activeTab, setActiveTab] = useState("donor");
  
  // Existing donor state
  const [inputs, setInputs] = useState({
    name: "",
    tel: "",
    email: "",
    address: "",
    weight: "",
    bloodGroup: "",
    age: "",
    diseases: "",
  });

  // Updated order state with email
  const [orderInputs, setOrderInputs] = useState({
    name: "",
    email: "",
    tel: "",
    bloodType: "",
    units: "",
    urgency: "",
    date: new Date().toISOString().split('T')[0],
    status: "pending"
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOrderChange = (e) => {
    setOrderInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddProspect = async () => {
    if (
      !inputs.name ||
      !inputs.tel ||
      !inputs.email ||
      !inputs.address ||
      !inputs.weight ||
      !inputs.bloodGroup ||
      !inputs.age
    ) {
      toast.warning("Please fill in all required fields.");
      return;
    }

    try {
      await publicRequest.post("/prospects", inputs);
      toast.success("You have been successfully saved to the database.");
      setInputs({
        name: "",
        tel: "",
        email: "",
        address: "",
        weight: "",
        bloodGroup: "",
        age: "",
        diseases: "",
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleAddOrder = async () => {
    if (
      !orderInputs.name ||
      !orderInputs.email ||
      !orderInputs.tel ||
      !orderInputs.bloodType ||
      !orderInputs.units ||
      !orderInputs.urgency
    ) {
      toast.warning("Please fill in all required fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(orderInputs.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Phone validation
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(orderInputs.tel)) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    // Units validation
    if (orderInputs.units <= 0) {
      toast.error("Units must be greater than 0.");
      return;
    }

    try {
      const res = await publicRequest.post("/orders", orderInputs);
      if (res.data) {
        toast.success("Your blood order request has been submitted successfully.");
        setOrderInputs({
          name: "",
          email: "",
          tel: "",
          bloodType: "",
          units: "",
          urgency: "",
          date: new Date().toISOString().split('T')[0],
          status: "pending"
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div
      id="contact"
      className="min-h-screen py-20 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-center mb-8">
          <button
            className={`px-6 py-3 rounded-l-lg ${
              activeTab === "donor"
                ? "bg-red-500 text-white"
                : "bg-white text-gray-700"
            } transition-colors duration-300`}
            onClick={() => setActiveTab("donor")}
          >
            Become a Donor
          </button>
          <button
            className={`px-6 py-3 rounded-r-lg ${
              activeTab === "order"
                ? "bg-red-500 text-white"
                : "bg-white text-gray-700"
            } transition-colors duration-300`}
            onClick={() => setActiveTab("order")}
          >
            Request Blood
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {activeTab === "donor" ? (
            // Existing donor form
            <div className="p-8 md:p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Become a Blood Donor
                </h2>
                <p className="text-gray-600 text-lg">
                  Your donation can save lives. Fill in your information below.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={inputs.name}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none"
                    placeholder="John Doe"
                    onChange={handleChange}
                  />
                </div>

                {/* Phone Input */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Telephone *</label>
                  <input
                    type="text"
                    name="tel"
                    value={inputs.tel}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none"
                    placeholder="+234 678 908"
                    onChange={handleChange}
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={inputs.email}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none"
                    placeholder="jamesdoe@gmail.com"
                    onChange={handleChange}
                  />
                </div>

                {/* Address Input */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={inputs.address}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none"
                    placeholder="123 Sydney AUS"
                    onChange={handleChange}
                  />
                </div>

                {/* Weight Input */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Weight (kg) *</label>
                  <input
                    type="number"
                    name="weight"
                    value={inputs.weight}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none"
                    placeholder="50"
                    onChange={handleChange}
                  />
                </div>

                {/* Blood Group Select */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Blood Group *</label>
                  <select
                    name="bloodGroup"
                    value={inputs.bloodGroup}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none appearance-none bg-white"
                    onChange={handleChange}
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                {/* Age Input */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Age *</label>
                  <input
                    type="number"
                    name="age"
                    value={inputs.age}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none"
                    placeholder="30"
                    onChange={handleChange}
                  />
                </div>

                {/* Diseases Textarea - Full Width */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">Medical Conditions</label>
                  <textarea
                    name="diseases"
                    value={inputs.diseases}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none min-h-[100px]"
                    placeholder="Please list any medical conditions you have..."
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mt-8">
                <button
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold py-4 rounded-lg 
                  hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:scale-[1.02] 
                  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-lg"
                  onClick={handleAddProspect}
                >
                  Register as Donor
                </button>
              </div>
            </div>
          ) : (
            // Updated order form
            <div className="p-8 md:p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Request Blood
                </h2>
                <p className="text-gray-600 text-lg">
                  Fill in the details to request blood units
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={orderInputs.name}
                    onChange={handleOrderChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none"
                    placeholder="Your Name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={orderInputs.email}
                    onChange={handleOrderChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Contact Number *</label>
                  <input
                    type="tel"
                    name="tel"
                    value={orderInputs.tel}
                    onChange={handleOrderChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none"
                    placeholder="+1234567890"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Blood Type *</label>
                  <select
                    name="bloodType"
                    value={orderInputs.bloodType}
                    onChange={handleOrderChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none"
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Units Required (in Liters) *</label>
                  <input
                    type="number"
                    name="units"
                    value={orderInputs.units}
                    onChange={handleOrderChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none"
                    placeholder="Enter units in liters"
                    step="0.1"
                    min="0.1"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Urgency Level *</label>
                  <select
                    name="urgency"
                    value={orderInputs.urgency}
                    onChange={handleOrderChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none"
                  >
                    <option value="">Select Urgency Level</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Normal">Normal</option>
                  </select>
                </div>
              </div>

              <div className="mt-8">
                <button
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold py-4 rounded-lg 
                  hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:scale-[1.02] 
                  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-lg"
                  onClick={handleAddOrder}
                >
                  Submit Blood Request
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;
