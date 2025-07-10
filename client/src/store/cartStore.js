import { create } from "zustand";
import { persist } from 'zustand/middleware';
const useCartStore= create(
 persist(
   (set) => ({
  cartItems: [],

  addToCart: (product) =>
    set((state) => {
      const exists = state.cartItems.find((item) => item._id === product._id);
      if (exists) {
        return {
          cartItems: state.cartItems.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        cartItems: [...state.cartItems, { ...product, quantity: 1 }],
      };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item._id !== id),
    })),
  
    updateCount:(id,newQuantity)=>
      set((state)=>({
        cartItems:state.cartItems.map((item)=>
          item._id===id ? {...item,quantity:newQuantity}:item )
          .filter((item)=>item.quantity>0)
      
      
      
    })),
  
  clearCart: () => set({ cartItems: [] }),
}),
{name:"cart-storage"}
 )
);

export default useCartStore;
