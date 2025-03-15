import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit, FaUserPlus } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { publicRequest } from '../requestMethods.js';

const Donors = () => {
  const [donors, setDonors] = useState([]);
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    { 
      field: "name", 
      headerName: "Name", 
      width: 200,
      renderCell: (params) => (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-2">
            {params.row.name.charAt(0).toUpperCase()}
          </div>
          <span>{params.row.name}</span>
        </div>
      )
    },
    { field: "email", headerName: "Email", width: 220 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "bloodgroup", headerName: "Blood Type", width: 130 },
    { field: "diseases", headerName: "Medical Conditions", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="flex gap-3">
            <Link to={`/admin/donor/${params.row._id}`}>
              <FaEdit className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer text-xl" />
            </Link>
            <FaTrash
              className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer text-xl"
              onClick={() => handleDelete(params.row._id)}
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const getDonors = async () => {
      try {
        const res = await publicRequest.get('/donors');
        setDonors(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getDonors()
  }, [])

  const handleDelete = async (id) => {
    try {
      await publicRequest.delete(`/donors/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Donor Management</h1>
            <p className="text-gray-500 mt-1">Manage and track all blood donors</p>
          </div>
          <Link to='/admin/newdonor'>
            <button className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-lg hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:scale-[1.02] shadow-md">
              <FaUserPlus />
              <span>Add New Donor</span>
            </button>
          </Link>
        </div>

        <div className="h-[600px] w-full">
          <DataGrid 
            rows={donors}
            getRowId={(row) => row._id}
            columns={columns}
            checkboxSelection
            className="border-none"
            sx={{
              '& .MuiDataGrid-cell:focus': {
                outline: 'none',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#f9fafb',
              },
              '& .MuiDataGrid-columnHeader': {
                backgroundColor: '#f3f4f6',
                color: '#374151',
                fontWeight: 'bold',
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Donors