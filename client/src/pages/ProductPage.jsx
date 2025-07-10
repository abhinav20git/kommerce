import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";
import React from "react";
import ReactDOM from "react-dom/client";
import axios from "../utils/axiosInstance";
import Loader from "../components/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ProductPage({ searchTerm }) {
  const { addToCart } = useCartStore();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [lowToHigh, setLowToHigh] = useState(false);
  useEffect(() => {
    const productApi = async () => {
      try {
        const res = await axios.get("/products");
        setProducts(res.data.data);
      } catch (err) {
        console.error("Failed to fetch products:", err.message);
      } finally {
        setLoading(false);
      }
    };

    productApi();
  }, []);
  useEffect(() => {
    const searched = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sorted = [...searched].sort((a, b) => 
      lowToHigh ? a.price - b.price : b.price - a.price
    );
    console.log(sorted);
    setSortedProducts(sorted);

    setLoading(false);
  }, [searchTerm, products,lowToHigh]);

  // const sorted = () => {

  // };
  if (loading) return <Loader />;
  return (
    <div className="container-fluid">
      {/* <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
      <ToastContainer
        position="top-right"
        className="mt-5 bg-grey"
        autoClose={1500}
        closeOnClick
        hideProgressBar={true}
      />
      <div className="text-center py-5">
        <h1 className="display-4 fw-4">Welcome to Our Shop</h1>
        <p className="lead">Find the best products at unbeatable prices</p>
        <div>
          <button
            className="btn btn-outline-primary"
            onClick={() => setLowToHigh(!lowToHigh)}
          >
            {!lowToHigh ? "Sort: Low to High" : "Sort: High to Low"}
          </button>
        </div>
      </div>

      <div className="row">
        {sortedProducts.length === 0 ? (
          <div className="d-flex justify-content-center align-items fs-3">
            <p>No such product found!!!</p>
          </div>
        ) : (
          sortedProducts.map((product) => (
            <div className="col-md-2 mb-4 max-h-40 pt-1 w-52 gap-2" key={product._id}>
              <div className="card  d-flex justify-content-center m-auto">
                <img
                  src={product.image}
                  className="card-img-top mt-2 m-auto"
                  alt={product.title}
                  style={{ height: "120px", width:"140px", objectFit: "contain" }}
                />
                <div className="card-body d-flex flex-column">
                  <Link
                    to={`/product/${product._id}`}
                    className="text-decoration-none text-dark"
                  >
                    <p className="card-text fw-bold">
                      {product.title.length > 15
                        ? product.title.substring(0, 15) + "...."
                        : product.title}
                    </p>
                  </Link>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="card-text mb-0">${product.price}</p>
                    <span className="card-text">
                      ⭐{product.rating?.rate} / {product.rating?.count}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      addToCart(product);
                      toast.success("Product added Successfully");
                    }}
                    className="btn btn-primary mt-1"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductPage;
