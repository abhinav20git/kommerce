import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useCartStore from "../store/cartStore";
import axios from "../utils/axiosInstance.js";

const ProductDetails = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const {addToCart}=useCartStore();
  console.log(id)
  useEffect(() => {
    const productApi = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        console.log(res)
        setProduct(res.data.data);
        console.log(res)
      } catch (err) {
        console.error("Failed to fetch products:", err.message);
      }
    };

    if(id) productApi();
  }, [id]);

  if (!product) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container my-5">
      <Link to="/product-page" className="btn btn-secondary mb-4">
        ← Back to Products
      </Link>

      <div className="row">
        <div className="col-md-5">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </div>

        <div className="col-md-7">
          <h2>{product.title}</h2>
          <p className="text-muted">{product.category}</p>
          <h4 className="text-primary">${product.price}</h4>
          <p>{product.description}</p>
          <p>
            ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
          </p>
          <button onClick={()=>addToCart(product)} className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
