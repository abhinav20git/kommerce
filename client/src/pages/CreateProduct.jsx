import React, { useState } from "react";
import axios from "../utils/axiosInstance";
import { toast, ToastContainer } from "react-toastify";

const AddProductPage = () => {
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/products", formData);
      const productId = res.data.data._id;

      
      if (imageFile && productId) {
        const imageForm = new FormData();
        imageForm.append("image", imageFile);
        imageForm.append("productId",productId)
        await axios.post("/products/image", imageForm
          , 
          {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      }

      setMessage("Product added successfully!");
      toast.success("Product added successfully!");
      e.target.reset(); 
    } catch (error) {
      setMessage(error.response?.data?.message || " Error adding product");
    }
  };
  {message && toast.success("Product added successfully!")}
  return (
    <div className="container my-5 " style={{  maxWidth: "600px" }}>

      {/* <ToastContainer
        position="top-right"
        className="mt-5 bg-grey"
        autoClose={1500}
        closeOnClick
        hideProgressBar={true}
      /> */}
      <h2 className="mb-4">Add New Product</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input
            name="price"
            type="number"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            
          />
        </div>
        <div className="mb-3">
          <label>Category</label>
          <input
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Product Image</label>
          <input
            accept="image/*"
            type="file"
            className="form-control"
            onChange={handleImageChange}
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
