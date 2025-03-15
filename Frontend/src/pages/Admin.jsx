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
          const transformedData = res.data.map((item, index) => ({
            id: index,
            value: item.count,
            label: `Blood Group ${item._id}`,
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
      <div className="flex justify-between h-[100vh] bg-gray-50">
        <div className="flex flex-col flex-1">
          <div className="flex flex-wrap">
            <div className="bg-white h-[300px] m-[30px] w-[350px] shadow-lg rounded-xl">
              <div className="h-[200px] w-[200px]">
                <Gauge
                  value={prospectCount}
                  startAngle={10}
                  endAngle={360}
                  innerRadius="80%"
                  outerRadius="100%"
                />
              </div>
              <h2 className="font-semibold text-[18px] m-[20px]">Prospects</h2>
            </div>
            <div className="bg-white h-[300px] m-[30px] w-[350px] shadow-lg rounded-xl">
              <div className="h-[200px] w-[200px] m-[30px] border-[20px] border-red-400 border-solid rounded-full">
                <div className="flex items-center justify-center m-[30px]">
                  <h2 className="font-bold text-[25px] m-[40px]">{donorCount}</h2>
                </div>
                <h2 className="flex items-center font-semibold justify-center text-[18px] m-[50px]">
                  Donors
                </h2>
              </div>
            </div>
          </div>

          <div className="bg-white m-[40px] p-6 rounded-xl shadow-lg">
            <h3 className="font-semibold text-xl mb-4">Blood Donation Trends</h3>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                  color: '#ef4444'
                },
              ]}
              height={300}
              margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
              grid={{ vertical: true, horizontal: true }}
            />
          </div>
        </div>

        <div className="flex flex-col bg-white m-[20px] h-[700px] w-[350px] shadow-xl rounded-xl">
          <div className="flex items-center p-[20px] border-b border-gray-100">
            <FaUser className="mr-3 text-gray-600" />
            <span className="cursor-pointer font-semibold hover:text-red-500 transition-colors" onClick={handleLogout}>
              Logout
            </span>
          </div>
          <div className="p-[20px]">
            <h3 className="font-semibold text-xl mb-4 text-gray-800">Recent Donors</h3>
            <ul className="space-y-4">
              {recentDonors.map((donor, index) => (
                <li key={donor._id} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-full mr-3">
                    {index + 1}
                  </span>
                  <span className="font-medium text-gray-700">{donor.name}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {bloodGroupData.length === 0 ? <span>Loading data...</span> :
          <PieChart
            series={[
              {
                data: bloodGroupData,
                innerRadius: 50,
                outerRadius: 70,
                paddingAngle: 7,
                cornerRadius: 5,
                startAngle: -90,
                endAngle: 180,
                cx: 150,
                cy: 100,
              },
            ]}
          />
          }
        </div>
      </div>
    );
  };

  export default Admin;
