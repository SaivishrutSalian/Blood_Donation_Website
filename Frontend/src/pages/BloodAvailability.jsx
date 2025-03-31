import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BloodAvailability = () => {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await fetch("https://lifesource.onrender.com/api/v1/donors");
        if (!response.ok) {
          throw new Error("Failed to fetch donor availability data");
        }
        const data = await response.json();
        setDonors(data);
        setFilteredDonors(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  // Function to filter donors based on selected blood group
  const handleFilterChange = (event) => {
    const bloodGroup = event.target.value;
    setSelectedBloodGroup(bloodGroup);
    if (bloodGroup === "") {
      setFilteredDonors(donors);
    } else {
      setFilteredDonors(donors.filter((donor) => donor.bloodgroup === bloodGroup));
    }
  };

  if (loading) return <p>Loading blood availability...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      {/* Website Logo (Navigates to Home) */}
      <div className="flex items-center mb-4">
        <Link to="/">
          <img src="/logo1.png" alt="Logo" className="w-20 cursor-pointer" />
        </Link>
        <h1 className="text-2xl font-bold ml-4">Donor Availability</h1>
      </div>

      {/* Blood Group Filter Dropdown */}
      <div className="mb-4">
        <label className="font-semibold mr-2">Filter by Blood Group:</label>
        <select
          value={selectedBloodGroup}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
      </div>

      {/* Donor List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDonors.map((donor) => (
          <div key={donor._id} className="p-4 border rounded shadow">
            <h2 className="text-lg font-semibold">{donor.name}</h2>
            <p><strong>Blood Group:</strong> {donor.bloodgroup}</p>
            <p><strong>Address:</strong> {donor.address}</p>
            <p><strong>Contact:</strong> {donor.tel}</p>
            <p><strong>Age:</strong> {donor.age}</p>
            <p><strong>Weight:</strong> {donor.weight} kg</p>
            <p><strong>Blood Pressure:</strong> {donor.bloodpressure}</p>
            <p><strong>Diseases:</strong> {donor.diseases || "None"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodAvailability;
