
import React from "react";
import useCartStore from "../store/cartStore";
const Cart = () => {
  const { updateCount,cartItems, removeFromCart, clearCart } = useCartStore();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container py-5">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="d-flex align-items-center mb-3 justify-content-between w-100 py-2 bg-light p-4 py-6 rounded-4">
              <div className=" d-flex justify-content-center">
                <img src={item.image} alt={item.title} width="80" height="80" />
              <div className="ms-3">
                <h5>{item.title}</h5>
                <p>${item.price} × {item.quantity}</p>
              </div>
              </div>
              <div className="gap-4 ">
                 <button
                onClick={() => updateCount(item._id,item.quantity-1)}
                className="btn bg-danger text-white ms-auto mx-2"
              >
                -
              </button>
               <button
                onClick={() => updateCount(item._id,item.quantity+1)}
                className="btn bg-primary text-white ms-auto mx-2"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item._id)}
                className="btn btn-danger ms-auto"
              >
                Remove
              </button>
              </div>
              
            </div>
          ))}
          <h4>Total: ${totalPrice.toFixed(2)}</h4>
          <button className="btn btn-secondary me-2" onClick={clearCart}>
            Clear Cart
          </button>
          <button className="btn btn-success">Checkout</button>
        </>
      )}
    </div>
  );
};

export default Cart;