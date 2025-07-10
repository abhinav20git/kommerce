import axios from "../utils/axiosInstance";
import React, { useEffect, useState } from "react";

const UpdatePage = () => {
    const[ firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email, setEmail] = useState("");
      const [contact, setContact] = useState("");
      const [message, setMessage] = useState("");

  
 useEffect(() => {
      const fetchLoggedInUser = async () => {
        try {
          const res = await axios.get("/user/current-user");
          const userData = res.data.data;
          setFirstName(userData.firstName);
          setLastName(userData.lastName); 
          setEmail(userData.email);
          setContact(userData.contact);
        } catch (err) {
          console.error("Error fetching user:", err.message);
        }
      };

      fetchLoggedInUser();
    }, []);
const handleSubmit = async (e) => {
    e.preventDefault();
     try {
    const res = await axios.patch("/user/update-account", {
      firstName,
      lastName,
      email,
      contact,
    });

    console.log("Update success:", res.data);
    setMessage("Profile updated successfully!");
  } catch (err) {
    console.error("Update error:", err);
    setMessage("Update failed: " + (err.response?.data?.message || err.message));
  }
    
  };
   
   
  return (
    <div className="container pt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Update Profile</h2>

      <form onSubmit={handleSubmit}>
         <div className="mb-3">
          <label>Name</label>
          <input
            type="name"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
          />
        </div>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="name"
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter  last name"
          />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>

        <div className="mb-3">
          <label>Contact</label>
          <input
            type="text"
            className="form-control"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Enter contact number"
          />
        </div>

        

        {message && <div className="alert alert-danger">{message}</div>}

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
       
      </form>
    </div>
  );
};

export default UpdatePage;
