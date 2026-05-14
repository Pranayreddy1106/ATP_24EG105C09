import React, { useState } from "react";
import { useForm } from "react-hook-form";

function FormAssignment() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [users, setUsers] = useState([]);
  
  const onFormSubmit = (obj) => {
    console.log(obj);
    setUsers([...users, obj]);
  };

  return (
    <div>
      <div className="bg-blue-300 p-3">
      <h1 className="text-center text-4xl">Create User</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="max-w-md mx-auto mt-10"
      >
        <div className="mb-3">
          <label htmlFor="firstName">FirstName</label>
          <input
            type="text"
            {...register("firstName", {
              required: "FirstName is required",
              minLength: { value: 2, message: "Minimum length is 2" },
            })}
            id="firstName"
            className="bg-gray-300 border-2 w-full p-3"
          />

          {/* {errors.firstName?.type === "required" && (
            <p className="text-red-500">{errors.firstName.message}</p>
          )}
          {errors.firstName?.type === "minLength" && (
            <p className="text-red-500">{errors.firstName.message}</p>
          )} */}

          {/* validation error handiling */}
          {errors.firstName && <p className='text-red-500'>{errors.firstName.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
            id="email"
            className="bg-gray-300 border-2 w-full p-3"
          />

          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            {...register("dob", {
              required: "Date of birth is required",
            })}
            id="dob"
            className="bg-gray-300 border-2 w-full p-3"
          />

          {errors.dob?.type === "required" && (
            <p className="text-red-500">{errors.dob.message}</p>
          )}
        </div>

        <button type="submit" className="p-3 bg-fuchsia-600 text-black">
          Add Users
        </button>
      </form>
      </div>
      <div className="mt-5 bg-red-400">
        <h1 className="text-3xl text-center mb-4 text-black">List of Users</h1>
        <div className="flex justify-around gap-4">
          <div>
            <p className="text-xl text-white ">FirstName</p>
            <ul>
              {users.map((user) => (
                <li>{user.firstName}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xl text-white ">Email</p>
            <ul>
              {users.map((user) => (
                <li>{user.email}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xl text-white ">DOB</p>
            <ul>
              {users.map((user) => (
                <li>{user.dob}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormAssignment;
