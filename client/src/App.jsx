// import "bootstrap/dist/css/bootstrap.min.css";
// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import ProductPage from "./pages/ProductPage";
// import Layout from "./pages/Layout";
// import ProductDetails from "./pages/ProductDetail";
// import Cart from "./pages/Cart";
// import Navbar from "./components/Navbar";
// import Profile from "./pages/Profile";
// import SignUpPage from "./pages/SignUpPage";
// import SignInPage from "./pages/SignInPage";
// export default function App() {
//   const [searchTerm, setSearchTerm] = useState("");
//   return (
//     <div>
//       <Router>
//         <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//         <Routes>
//           <Route element={<Layout />}>
//           <Route path="/profile" element={<Profile/>} />
//             <Route path="/" element={<Home />} />
//             <Route path="/product-page" element={<ProductPage searchTerm={searchTerm}/>} />
//             <Route path="/product/:id" element={<ProductDetails />} />
//             <Route path="/cart" element={<Cart/> } />
//             <Route path="/sign-up" element={<SignUpPage/>}/>
//              <Route path="/sign-in" element={<SignInPage/>}/>
//           </Route>
//         </Routes>
//       </Router>
//     </div>
//   );
// }
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Layout from "./pages/Layout";
import ProductDetails from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import {ProtectedRoute} from "./components/ProtectedRoute";
import CategoryPage from "./pages/CategoryPage";
import CreateProduct from "./pages/CreateProduct";
import UpdatePage from "./pages/UpdatePage";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleLogin = (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
  };
const handleLogout = () => {
  localStorage.removeItem("token");
  setToken("");
};
   

  return (
    <Router>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        token={token}
        onLogout={handleLogout}
      />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/product-page"
            element={<ProtectedRoute token={token}><ProductPage searchTerm={searchTerm} /></ProtectedRoute>}
          />
          <Route path="/product/:id" element={<ProtectedRoute token={token}><ProductDetails /></ProtectedRoute>} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute token={token}>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute token={token}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-page"
            element={
              <ProtectedRoute token={token}>
                <UpdatePage />
              </ProtectedRoute>
            }
          /><Route
            path="/category/:categoryName"
            element={
              <ProtectedRoute token={token}>
                <CategoryPage />
              </ProtectedRoute>
            }
          />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route
            path="/sign-in"
            element={<SignInPage onLogin={handleLogin} />}
          />

          
        </Route>
        <Route path="/create-product" element={<CreateProduct />} />
      </Routes>
    </Router>
  );
}
