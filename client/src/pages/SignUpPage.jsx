import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";

function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      
     
        const formData=new FormData();
        formData.append("firstName",firstName);
        formData.append("lastName",lastName);
        formData.append("email",email);
        formData.append("contact",contact);
         formData.append("password", password);
        if(imageFile){
          formData.append("avatar",imageFile)
        }
      
      const res=await axios.post("/user/register",formData,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      // const res = await axios.post("/user/register", {
      //   firstName,
      //   lastName,
      //   email,
      //   contact,
      //   password,
      //   imageFile
      // });
      // const data=new FormData();
      // data.append("avatar",imageFile);
      
      // if(imageFile ){
      //   await axios.post("/register", data
      //     , 
      //     {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      // }
      
      console.log(imageFile)
      setMessage(res.data.message);

      // if (res.data.message === "Signup successful") {
      //   setTimeout(() => navigate("/sign-in"), 1000);
      // }
    } catch (err) {
      const msg = err.response?.data?.message || "Signup failed";
      setMessage(msg);
      console.error("Signup error:", msg);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3">Create Account</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label>Avatar</label>
          <input
            type="file"
            accept="/image/*"
            className="form-control"
            onChange={handleImageChange}
            placeholder="Enter your Avatar"
          />
        </div>
        <div className="mb-3">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
          />
        </div>

        <div className="mb-3">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
          />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            required
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
            required
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
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;
