import { useState, useEffect } from "react";

function TestedTypes() {
  let [users, setUsers] = useState([]);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);

  //a function to make api request
  // The useEffect callback itself cannot be an async function. React expects the effect to return either nothing or a "cleanup" function.
  useEffect(() => { 
    console.log("Rendered")
    async function getData() {
      //set loading state to true
      setLoading(true);

      try {
        let res = await fetch("https://jsonplaceholder.typicode.com/posts");
        let usersList = await res.json();
        //update state
        setUsers(usersList);
      } catch (err) {
        console.log("err is", err);
        //update error state
        setError(err);
      } finally {
        //update loading state to false
        setLoading(false);
      }
    }
    //call
    getData();
  }, []);

  //deal with loading state
  if (loading) {
    return <p className="text-center text-3xl font-bold">Loading...</p>;
  }

  //deal with error state
  if (error) {
    return <p className="text-center text-3xl text-red-500">{error.message}</p>;
  }
  return (
    <div className="text-center mb-20">
      <h1 className="text-4xl text-blue-500 m-3">List of Users</h1>
      <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div key={user.id} className="shadow-xl shadow-mist-800 ">
            <p className="mb-3 text-red-600">{user.title}</p>
            <p>{user.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestedTypes;
