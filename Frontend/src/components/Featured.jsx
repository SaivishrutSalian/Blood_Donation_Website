const Featured = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Who We Are Section */}
        <div className="flex flex-col lg:flex-row items-center gap-8 mb-20">
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-3xl font-bold text-gray-800 mb-2">Who We Are?</h3>
              <div className="h-1.5 w-24 bg-gradient-to-r from-red-600 to-red-400 rounded-full mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-8">
                BloodBridge is a public donation center dedicated to saving lives
                through blood donation. We connect donors with those in need,
                ensuring a steady and safe blood supply.
              </p>
              <ul className="space-y-4">
                {[
                  "Specialist blood donors and clinical supervision",
                  "Increasing communication with our members",
                  "High-quality assessment, diagnosis, and treatment",
                  "Examining critically to ensure alignment",
                  "The extra care of a multi-disciplinary team"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-100">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Video Section */}
          <div className="lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <video 
                src="/video.mp4" 
                className="w-full h-full object-cover"
                style={{ minHeight: "500px" }}
                loop 
                muted 
                autoPlay 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Why Donate Section */}
        <div className="bg-white rounded-2xl shadow-xl p-10 hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-2">Why Donate Blood?</h3>
          <div className="h-1.5 w-24 bg-gradient-to-r from-red-600 to-red-400 rounded-full mx-auto mb-10"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "🩸", title: "Save Lives", desc: "Every 2 seconds, someone needs blood" },
              { icon: "❤️", title: "No Substitute", desc: "Blood cannot be made artificially" },
              { icon: "🔄", title: "Help Patients", desc: "Support accidents, surgeries, cancer treatments" },
              { icon: "💪", title: "Health Benefits", desc: "Stimulates new blood cell production" },
              { icon: "🎗️", title: "Big Impact", desc: "One donation can save up to 3 lives" },
              { icon: "🌟", title: "Be a Hero", desc: "Join our community of lifesavers" }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300">
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
