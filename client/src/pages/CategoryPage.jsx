import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../utils/axiosInstance"; // your configured axios
import useCartStore from "../store/cartStore";
import Loader from "../components/Loader";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [loading,setLoading]=useState(true);
  const decodedCategory = decodeURIComponent(categoryName);
  const [products, setProducts] = useState([]);
  const { addToCart } = useCartStore();
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const res = await axios.get(`/products`);
        const filtered = res.data.data.filter((product) =>
          product.category
            ?.toLowerCase()
            .includes(decodedCategory.toLowerCase())
        );
        
        setProducts(filtered);
        res.data.forEach((p) => console.log("Product Category:", p.category));
     
      } catch (err) {
        console.error("Error fetching category products:", err.message);
      }finally{
         setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [decodedCategory]);
  if(loading) <Loader/>
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-semibold text-capitalize">
        Products in "{decodedCategory}" Category
      </h2>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="col-md-3 mb-4" key={product._id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={product.image}
                  alt={product.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <div className="card-body d-flex flex-column">
                  <Link
                    to={`/product/${product._id}`}
                    className="text-decoration-none text-dark"
                  >
                    <h5 className="card-title">{product.title}</h5>
                  </Link>
                  <p className="mb-1">${product.price}</p>
                  <p className="text-muted small">⭐ {product.rating?.rate}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="btn btn-primary mt-auto"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center"><Loader/></p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
