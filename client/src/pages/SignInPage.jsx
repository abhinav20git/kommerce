import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";

function SignInPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMsg("");

  try {
    const res = await axios.post("/user/login", { email, contact, password });

    const { accessToken } = res.data.data;
    if (accessToken) {
      // const data=localStorage.setItem(token,"accessToken");
      // console.log(data)
      onLogin(accessToken);
      navigate("/");
    } else {
      setErrorMsg("Invalid login response.");
    }
  } catch (err) {
    setErrorMsg(err.response?.data?.message || "Login failed.");
  }
};


  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Sign In</h2>

      <form onSubmit={handleSubmit}>
        
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

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter password"
          />
        </div>

        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        <button type="submit" className="btn btn-primary w-100">
          Sign In
        </button>
        <div className="mt-4">
          <Link className="text-decoration-none" to="/sign-up"> <p className="fw-bold text-decoration-none text-dark text-end">New here ? Register yourself</p></Link>
        </div>
      </form>
    </div>
  );
}

export default SignInPage;
