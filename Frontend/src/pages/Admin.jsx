  import { PieChart } from "@mui/x-charts/PieChart";
  import { LineChart } from "@mui/x-charts/LineChart";
  import { Gauge } from "@mui/x-charts/Gauge";
  import { FaUser } from "react-icons/fa";
  import { useNavigate } from "react-router-dom";
  import { useDispatch } from "react-redux";
  import { logOut } from "../redux/userRedux";
  import { useEffect, useState } from "react";
  import { publicRequest } from "../requestMethods";
  

  const Admin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [recentDonors, setRecentDonors] = useState([]);
    const [prospectCount, setProspectCount] = useState(0);
    const [donorCount, setDonorCount] = useState(0);
    const [bloodGroupData, setBloodGroupData] = useState([]);

    // Define the blood group order
    const bloodGroupOrder = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    useEffect(() => {
      const getRecentDonors = async () => {
        try {
          const donorsRes = await publicRequest.get("/donors");
          setRecentDonors(donorsRes.data.slice(0, 4));
          setDonorCount(donorsRes.data.length);
        } catch (error) {
          console.log(error);
        }
      };

      const getProspects = async () => {
        try {
          const prospectsRes = await publicRequest.get("/prospects");
          setProspectCount(prospectsRes.data.length);
        } catch (error) {
          console.log(error);
        }
      };

      const getBloodGroupStats = async () => {
        try {
          const res = await publicRequest.get("/donors/stats");
          // Create a map for easy lookup of counts
          const bloodGroupCounts = res.data.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
          }, {});

          // Create ordered data using the defined sequence
          const transformedData = bloodGroupOrder.map((group, index) => ({
            id: index,
            value: bloodGroupCounts[group] || 0, // Use 0 if no count exists
            label: `Blood Group ${group}`,
          }));

          setBloodGroupData(transformedData);
        } catch (error) {
          console.log(error);
        }
      };
    
      getRecentDonors();
      getProspects();
      getBloodGroupStats();
    }, []);

    const handleLogout = () => {
      dispatch(logOut());
      navigate("/login");
    };

    return (
      <div className="flex justify-between min-h-screen bg-gray-50">
        <div className="flex flex-col flex-1 p-6">
          {/* Top Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Prospects Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-xl text-gray-800">Prospects</h2>
              </div>
              <div className="flex justify-center">
                <div className="h-[200px] w-[200px]">
                  <Gauge
                    value={prospectCount}
                    startAngle={10}
                    endAngle={360}
                    innerRadius="80%"
                    outerRadius="100%"
                  />
                </div>
              </div>
            </div>

            {/* Donors Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-xl text-gray-800">Total Donors</h2>
              </div>
              <div className="flex justify-center">
                <div className="h-[200px] w-[200px] border-[20px] border-red-400 border-solid rounded-full flex items-center justify-center">
                  <h2 className="font-bold text-3xl text-gray-800">{donorCount}</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Blood Donation Trends Chart */}
          <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-xl text-gray-800">Blood Group Distribution</h3>
              <div className="flex gap-2 flex-wrap">
                {bloodGroupData.map((group) => (
                  <div key={group.id} className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-red-500 mr-1" />
                    <span className="text-sm text-gray-600">
                      {group.label.split('Blood Group ')[1]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <LineChart
              xAxis={[{ 
                data: bloodGroupData.map(group => group.label.split('Blood Group ')[1]),
                label: 'Blood Groups',
                scaleType: 'band',
              }]}
              yAxis={[{
                label: 'Units Available'
              }]}
              series={[
                {
                  data: bloodGroupData.map(group => group.value),
                  color: '#ef4444',
                  area: false,
                  curve: "linear",
                  lineWidth: 2,
                  showMark: true
                }
              ]}
              height={300}
              margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
              grid={{ vertical: true, horizontal: true }}
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[400px] bg-white shadow-xl">
          {/* Logout Section */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FaUser className="text-gray-600 text-xl" />
                <span className="ml-3 font-semibold text-gray-800">Admin Dashboard</span>
              </div>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Recent Donors Section */}
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-semibold text-xl mb-4 text-gray-800">Recent Donors</h3>
            <ul className="space-y-3">
              {recentDonors.map((donor, index) => (
                <li key={donor._id} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <span className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-full mr-4 font-semibold">
                    {index + 1}
                  </span>
                  <span className="font-medium text-gray-700">{donor.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Blood Groups Section */}
          <div className="p-6">
            <h3 className="font-semibold text-xl mb-4 text-gray-800">Available Blood Groups</h3>
            {bloodGroupData.length === 0 ? (
              <div className="flex justify-center items-center h-40">
                <span className="text-gray-500">Loading data...</span>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {bloodGroupData.map((group) => (
                  <div 
                    key={group.id} 
                    className="p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex flex-col items-center text-center">
                      <span className="font-medium text-gray-700 mb-1">
                        {group.label.split('Blood Group ')[1]}
                      </span>
                      <span className="px-3 py-1 bg-red-100 text-red-600 rounded-lg font-semibold text-sm">
                        {group.value} units
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default Admin;
