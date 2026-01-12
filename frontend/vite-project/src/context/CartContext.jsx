import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../utils/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();
//const backendUrl = import.meta.env.VITE_BACKEND_URL;
const backendUrl = import.meta.env.VITE_API_URL;

export const CartProvider = ({ children }) => {
  const { user, authLoading } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  const fetchCart = async () => {
  if (!user) return;

  try {
    setCartLoading(true);
    const res = await API.get("/cart");

    const items = Array.isArray(res.data.items)
      ? res.data.items
      : [];

    // 🔥 FORCE new reference every time
    setCartItems([...items]);

  } catch {
    setCartItems([]);
  } finally {
    setCartLoading(false);
  }
};


  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setCartItems([]);
      return;
    }
    fetchCart();
  }, [user, authLoading]);

  const addToCart = async (courseId) => {
    if (!user) {
      toast.info("🔒 Please login to add courses to cart");
      return;
    }

    try {
       await API.post("/cart", { courseId });
    fetchCart(); // 🔥 THIS IS REQUIRED
      toast.success(" Course added to cart");
    } catch (err) {
      if (err.response?.status === 409) {
        toast.warning("Course already exists in cart");
      } else {
        toast.error("Failed to add course to cart");
      }
    }
  };

  const removeFromCart = async (courseId) => {
  try {
    // ✅ OPTIMISTIC UPDATE (instant UI change)
    setCartItems(prev =>
      prev.filter(item => item.course._id !== courseId)
    );

    await API.delete(`/cart/${courseId}`);

    toast.success("🗑️ Course removed from cart");
  } catch (err) {
    toast.error("❌ Failed to remove course");
    fetchCart(); // rollback safety
  }
};


  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount: cartItems.length,
        addToCart,
        removeFromCart,
        cartLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
