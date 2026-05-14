import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import {counterContextObj} from '../contexts/ContextProvider.jsx'
import { useContext } from "react";


function ListOfEmps() {
  const [emps, setEmps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {counter1, changeCounter1} = useContext(counterContextObj);

  const gotoEmployee = (empObj) => {
      navigate("/employee", {state: empObj});
  };

  const editEmployee = (empObj) => {
    navigate("/edit-emp", {state: empObj});
  }

  const deleteEmployee = async (id) => {
    try{
    setLoading(true)
    let res = await axios.delete(`${import.meta.env.VITE_API_URL}/emp-api/employees/${id}`)
    if(res.status === 200){
      getEmps();
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

  if (error) {
  return <p className="text-red-500">{error}</p>;
}


  async function getEmps() {
      let res = await fetch(`${import.meta.env.VITE_API_URL}/emp-api/employees`);
      if (res.status === 200) {
        let resObj = await res.json();
        setEmps(resObj.payload);
      }
    }

  // Get all on component loading
  useEffect(() => {
    getEmps();
  }, []);

  return (
    <div>
      
      <h1 className="text-4xl text-center">List of Employees</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {emps.map((empObj) => (
          <div key={empObj._id} className=" bg-white p-5 rounded-2xl shadow-lg text-center max-w-full">
            <p className="max-w-full">{empObj.email}</p>
            <p className="max-w-full">{empObj.name}</p>
            <p className="mb-2.5 italic">{empObj.designation}</p>
            {/* 3 buttons */}
            <div className="flex justify-around gap-1.5 max-w-full">
              <button onClick={() => editEmployee(empObj)}  className="bg-blue-500 text-white p-2 rounded-lg">Edit</button>
              <button onClick={() => deleteEmployee(empObj._id)}  className="bg-red-500 text-white p-2 rounded-lg">Delete</button>
              <button onClick={() => gotoEmployee(empObj)} className="bg-green-500 text-white p-2 rounded-lg">View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListOfEmps;
