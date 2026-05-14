import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function EditEmployee() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { state } = useLocation();
  useEffect(() => {
    setValue("name", state.name);
    setValue("email", state.email);
    setValue("mobile", state.mobile);
    setValue("designation", state.designation);
    setValue("companyName", state.companyName); 
  }, []);

  const saveModifiedUser = async (modifiedUser) => {
    // console.log(modifiedUser);
    try{
    setLoading(true);  
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/emp-api/employees/${state._id}`, modifiedUser)
    if(res.status === 200){
      navigate("/list");
    }else{
      let errorRes = await res.json();
      throw new Error(errorRes.reason);
    }
    }catch(err){
      console.log("err in catch", err);
      //deal with err
      setError(err.message);
    }finally{
      setLoading(false);
    }
  }

  console.log(error)

  if(loading){
    return <p className="text-center text-4xl">Loading....</p>
  }

  if(error){
    return <p className="text-red-500 text-center text-3xl">{error}</p>
  }

  return (
    <div>
      <h1 className="text-5xl text-center text-gray-600">Edit Employee</h1>
      {/* form */}
      <form className=" max-w-md mx-auto mt-10" onSubmit={handleSubmit(saveModifiedUser)}>
        <input
          type="text"
          placeholder="Enter name "
          {...register("name")}
          className="mb-3 border border-2 p-3 w-full rounded-2xl"
        />
        <input
          type="email"
          placeholder="Enter Email "
          {...register("email")}
          className="mb-3 border border-2 p-3 w-full rounded-2xl"
        />

        <input
          type="number"
          placeholder="Enter mobile number"
          {...register("mobile")}
          className="mb-3 border border-2 p-3 w-full rounded-2xl"
        />
        <input
          type="text"
          placeholder="Enter designation"
          {...register("designation")}
          className="mb-3 border border-2 p-3 w-full rounded-2xl"
        />
        <input
          type="text"
          placeholder="Enter name of the company"
          {...register("companyName")}
          className="mb-3 border border-2 p-3 w-full rounded-2xl"
        />

        <button
          type="submit"
          className="text-2xl rounded-2xl bg-blue-950 text-white block mx-auto p-4"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default EditEmployee;
