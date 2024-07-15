import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { publicRequest } from "../requestMethods";

const Contact = () => {

  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleAddProspect = async () => {
    try {
      await publicRequest.post("/prospects", inputs);
      toast.success("You have been successfully saved to the database.")
     setInputs({})
    } catch (error) {
      toast.warning("Make sure you have fill all fields");
    }
  };
console.log(inputs)
  return (
    <div className="flex items-center justify-center  h-auto my-[100px]">
      <div className="flex flex-col bg-gray-100 w-[50%] h-auto p-[50px]">
        <span className="text-[20px] my-[20px]">
          Do you want to donate blood? Fill in the information.
        </span>
        <label htmlFor="" className="text-[18px] mt-[10px]">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={inputs.name || ""}
          className="w-[350px] p-[15px]"
          placeholder="John Doe"
          onChange={handleChange}
          
        />

        <label htmlFor="" className="text-[18px] mt-[10px]">
          Telephone
        </label>
        <input
          type="String"
          name="tel"
          value={inputs.tel || ""}
          className="w-[350px] p-[15px]"
          placeholder="+234 678 908"
          onChange={handleChange}
          
        />
        <label htmlFor="" className="text-[18px] mt-[10px]">
          Email
        </label>
        <input
          type="text"
          name="email"
          value={inputs.email || ""}
          className="w-[350px] p-[15px]"
          placeholder="jamesdoe@gmail.com"
          onChange={handleChange}
          
        />
         <label htmlFor="" className="text-[18px] mt-[10px]">
          Address
        </label>
        <input
          type="text"
          name="address"
          value={inputs.address || ""}
          className="w-[350px] p-[15px]"
          placeholder="123 Sydney AUS"
          onChange={handleChange}
          
        />
        <label htmlFor="" className="text-[18px] mt-[10px]">
          Weight
        </label>
        <input
          type="Number"
          name="weight"
          value={inputs.weight || ""}
          className="w-[350px] p-[15px]"
          placeholder="50kg"
          onChange={handleChange}
          
        />
         <label htmlFor="" className="text-[18px] mt-[10px]">
          Blood Group
        </label>
        <input
          type="text"
          name="bloodgroup"
          value={inputs.bloodgroup || ""}
          className="w-[350px] p-[15px]"
          placeholder="AB+"
          onChange={handleChange}
      
        />
        <label htmlFor="" className="text-[18px] mt-[10px]">
          Age
        </label>
        <input
          type="Number"
          name="age"
          value={inputs.age || ""}
          className="w-[350px] p-[15px]"
          placeholder="30 years"
          onChange={handleChange}
          
        />
       
        <label htmlFor="" className="text-[18px] mt-[10px]">
          Do you have any diseases?
        </label>
        <textarea
          type="Number"
          name="diseases"
          value={inputs.diseases || ""}
          className="w-[350px] p-[15px]"
          placeholder="I have a hypertension."
          onChange={handleChange}
      
        />
        <button className="bg-red-500 p-3 mt-3 w-[350px] cursor-pointer text-white" onClick={handleAddProspect}>
          Submit
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Contact;
