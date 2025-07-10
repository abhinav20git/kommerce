import { Link } from "react-router";
import axios from "../utils/axiosInstance";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const res = await axios.get("/user/current-user");
        const userData = res.data.data;
        setUser(userData);
        console.log(userData.email);
      } catch (err) {
        console.error("Error fetching user:", err.message);
      }
    };

    fetchLoggedInUser();
  }, []); 

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
    {user ? (
      <div className="card p-4 shadow rounded-4" style={{ maxWidth: "450px", width: "100%" }}>
        <div className="text-center mb-4">
          <h4 className="mb-3">Your Profile</h4>
          <img
            src={user.avatar}
            alt={`${user.firstName} ${user.lastName}`}
            className="rounded-circle shadow"
            width={120}
            height={120}
            style={{ objectFit: "cover" }}
          />
        </div>
        <ul className="list-group list-group-flush mb-4">
          <li className="list-group-item">
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </li>
          <li className="list-group-item">
            <strong>Email:</strong> {user.email}
          </li>
          <li className="list-group-item">
            <strong>Contact:</strong> {user.contact}
          </li>
        </ul>
        <div className="text-center">
          <Link to="/update-page" className="btn btn-primary px-4 rounded-pill">
            Update Info
          </Link>
        </div>
      </div>
    ) : (
      <div className="text-center fs-5 text-muted">Loading your information...</div>
    )}
  </div>
  );
}
