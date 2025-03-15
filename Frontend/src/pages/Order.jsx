import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";

const Order = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const [order, setOrder] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await publicRequest.get("/orders/find/" + orderId);
        setOrder(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrder();
  }, [orderId]);

  const handleApprove = async () => {
    try {
      await publicRequest.put(`/orders/${orderId}`, {
        ...order,
        status: 0
      });
      navigate('/admin/orders');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="m-[20px] h-[80vh] w-[450px] shadow-lg">
        <h2 className="font-semibold m-[30px]">Blood Order Request</h2>
        <ul className="m-[30px]">
          <li className="mt-[10px]">
            <strong className="font-semibold">Name:</strong> {order.name}
          </li>
          <li className="mt-[10px]">
            <strong className="font-semibold">Email:</strong> {order.email}
          </li>
          <li className="mt-[10px]">
            <strong className="font-semibold">Contact:</strong> {order.tel}
          </li>
          <li className="mt-[5px]">
            <strong className="font-semibold">Blood Type:</strong> {order.bloodType}
          </li>
          <li className="mt-[5px]">
            <strong className="font-semibold">Units Required:</strong> {order.units}L
          </li>
          <li className="mt-[5px]">
            <strong className="font-semibold">Urgency Level:</strong> {order.urgency}
          </li>
          <li className="mt-[5px]">
            <strong className="font-semibold">Date:</strong> {order.date}
          </li>
          <li className="mt-[5px]">
            <strong className="font-semibold">Status:</strong>
            <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
              order.status === "pending" ? "bg-yellow-100 text-yellow-700" :
              order.status === "approved" ? "bg-green-100 text-green-700" :
              "bg-red-100 text-red-700"
            }`}>
              {order.status || "pending"}
            </span>
          </li>
        </ul>
        <span className="block m-[10px]">
          Do you want to approve this blood order request?
        </span>
        <button
          className="bg-red-400 text-white cursor-pointer p-[5px] w-[150px] m-[10px]"
          onClick={handleApprove}
        >
          Approve
        </button>
      </div>
    </div>
  );
};

export default Order;