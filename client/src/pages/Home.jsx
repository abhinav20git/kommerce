import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { Link } from "react-router";
import useCartStore from "../store/cartStore";
import { toast, ToastContainer } from "react-toastify";
const Home = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const { addToCart } = useCartStore();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const productApi = async () => {
      try {
        const res = await axios.get("/products");
        const results = res.data.data;
        const topRated = results
          .filter((product) => product.rating?.rate !== undefined)
          .sort((a, b) => b.rating.rate - a.rating.rate)
          .slice(0, 6);

        setBestSellers(topRated);
      } catch (err) {
        console.error("Failed to fetch products:", err.message);
      }
    };

    productApi();
  }, []);

  const hero = {
    heading: "Shop Smarter. Live Better.",
    subheading:
      "Discover top deals, trending products, and the best of tech, fashion & lifestyle.",
    cta: "Start Shopping",
    backgroundImage: "https://placehold.co/1200x400?text=Big+Sale",
  };

  const categories = [
    {
      id: 1,
      name: "Electronics",
      image: "https://placehold.co/150x150?text=Electronics",
    },
    {
      id: 2,
      name: "Men's Clothing",
      image: "https://placehold.co/150x150?text=Men Clothing",
    },
    {
      id: 3,
      name: "Women's Clothing",
      image: "https://placehold.co/150x150?text=Women Clothing",
    },
    {
      id: 4,
      name: "Jewelery",
      image: "https://placehold.co/150x150?text=Jewellery",
    },
  ];

  const testimonials = [
    {
      name: "Anjali S.",
      review: "Absolutely love the quality! Fast delivery and great support.",
      image: "https://placehold.co/100x100?text=Anjali",
    },
    {
      name: "Ravi K.",
      review: "Best prices for top products. Highly recommend this store!",
      image: "https://placehold.co/100x100?text=Ravi",
    },
  ];

  return (
    <div
      className="container-fluid p-0 "
      style={{ backgroundColor: "#DBEAFE" }}
    >
      <ToastContainer
        position="top-right"
        className="mt-5 bg-grey"
        autoClose={1500}
        closeOnClick
        hideProgressBar={true}
      />
      <div
        className="d-flex flex-column justify-content-center align-items-center text-white text-center"
        style={{
          backgroundImage: `url(${hero.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "350px",
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        ></div>
        <div style={{ zIndex: 2 }}>
          <h1 className="display-4 fw-bold">{hero.heading}</h1>
          <p className="lead">{hero.subheading}</p>
          <Link to="/product-page">
            <button className="btn btn-warning btn-lg mt-2">{hero.cta}</button>
          </Link>
        </div>
      </div>

      <div className="container my-5">
        <h2 className="text-center mb-4 fw-semibold">Shop by Category</h2>
        <div className="row">
          {categories.map((cat) => (
            <div className="col-md-3 text-center mb-4" key={cat.id}>
              <Link
                to={`/category/${encodeURIComponent(cat.name)}`}
                className="text-decoration-none text-dark"
              >
                <div className="card shadow-sm border-0 h-100 p-2">
                  <img
                    src={cat.image}
                    className="img-fluid rounded mb-2"
                    alt={cat.name}
                  />
                  <h5>{cat.name}</h5>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="container my-5">
        <h2 className="text-center mb-4 fw-semibold">Best Sellers</h2>
        <div className="row">
          {bestSellers.map((product) => (
            <div className="col-md-2 mb-4  pt-1 " key={product._id}>
              <div className="card h-100 d-flex justify-content-center m-auto">
                <img
                  src={product.image}
                  className="card-img-top mt-2 m-auto"
                  alt={product.title}
                  style={{
                    height: "120px",
                    width: "140px",
                    objectFit: "contain",
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">
                    {product.title.length > 15
                      ? product.title.substring(0, 15) + "...."
                      : product.title}
                  </h5>
                  <p className="card-text">${product.price}</p>
                  <p className="text-muted">⭐ {product.rating.rate}</p>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => {
                      addToCart(product);
                      toast.success("Product added Successfully!!!")
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="container my-5">
        <h2 className="text-center mb-4 fw-semibold">What Our Customers Say</h2>
        <div
          id="testimonialCarousel"
          className="carousel slide "
          data-bs-ride="carousel"
        >
          <div className="carousel-inner ">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <div className="d-flex flex-column align-items-center text-center ">
                  <img
                    src={t.image}
                    className="rounded-circle mb-3 shadow"
                    width="80"
                    height="80"
                    alt={t.name}
                  />
                  <h5>{t.name}</h5>
                  <p className="w-75">{t.review}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev "
            type="button"
            data-bs-target="#testimonialCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                borderRadius: "50%",
              }}
            ></span>
            <span className="">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#testimonialCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                borderRadius: "50%",
              }}
            ></span>
            <span className="">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
