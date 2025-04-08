import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { FaTrash, FaCheck } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { publicRequest } from '../requestMethods';

const Prospects = () => {
  const [prospects, setProspects] = useState([]);

  // In the columns configuration
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
    { 
      field: "bloodgroup", // Changed to match other components
      headerName: "Blood Type", 
      width: 130,
      renderCell: (params) => (
        <div className="font-semibold">
          {params.row.bloodgroup}
        </div>
      )
    },
    { field: "diseases", headerName: "Medical Conditions", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="flex gap-3">
            <Link to={`/admin/prospect/${params.row._id}`}>
              <FaCheck className="text-gray-600 hover:text-green-600 transition-colors cursor-pointer text-xl" />
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
    const getProspects = async () => {
      try {
        const res = await publicRequest.get('/prospects');
        setProspects(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProspects();
  }, []);

  const handleDelete = async (id) => {
    try {
      await publicRequest.delete(`/prospects/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1 p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Prospects Management</h1>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <DataGrid
          rows={prospects}
          columns={columns}
          getRowId={(row) => row._id}
          checkboxSelection
          autoHeight
          pageSize={10}
          rowsPerPageOptions={[10]}
          className="border-none"
          sx={{
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#f9fafb',
            },
          }}
        />
      </div>
    </div>
  );
};

export default Prospects;
