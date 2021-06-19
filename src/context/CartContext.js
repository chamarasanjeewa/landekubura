import React, { useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getCartProducts, updateCartProducts } from "./../services/cartService";
import { formatCurrency } from "./../common/utils";
import { useQuery, useMutation } from "react-query";

const CartContext = React.createContext();

export function CartProvider({ children }) {
  const [globalCart, setGlobalCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);
  const { cart, setCart } = useLocalstorageCart("shopping-cart");
  const { currentUser } = useAuth();

  useEffect(() => {
    setGlobalCart(cart);
  }, []);

  useEffect(() => {
    console.log(
      "running  cart product update ........................................."
    );
    const totalPrice = globalCart.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    setTotalPrice(formatCurrency(totalPrice));
    setCart(globalCart);
  }, [globalCart, setGlobalCart, loading]);

  const value = {
    cartProducts: globalCart,
    setCartProducts: setGlobalCart,
    totalPrice,
    loading
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}

export function useRemoveProductFromCart() {
  const { setCartProducts, cartProducts } = useCart();
  const [product, setRemovableProduct] = useState(null);
  const [removeAllFromGlobalCart, setRemoveAllFromGlobalCart] = useState(false);

  useEffect(() => {
    if (product) {
      const filteredProducts = cartProducts.filter(x => x.id != product.id);
      setCartProducts(filteredProducts);
    }
  }, [product, setRemovableProduct]);

  useEffect(() => {
    if (removeAllFromGlobalCart) {
      debugger;
      setCartProducts([]);
    }
  }, [removeAllFromGlobalCart, setRemoveAllFromGlobalCart]);

  return { setRemovableProduct, setRemoveAllFromGlobalCart };
}

export function useUpdateCart() {
  const { setCartProducts, cartProducts } = useCart();
  const [{ product, qty }, setProductQty] = useState({ product: null, qty: 0 });

  useEffect(() => {
    if (product) {
      const { productName, slug, coverImage, price } = product;
      const productExists = cartProducts.find(x => x.id == slug);

      if (productExists) {
        const mappedProducts = cartProducts.map(x => {
          if (x.id === slug) {
            x = { ...x, quantity: qty, cartQuantity: qty };
          }
          return x;
        });
        setCartProducts(mappedProducts);
      } else {
        const alteredProduct = {
          productName,
          id: slug,
          slug, //same as product id
          coverImage,
          quantity: qty,
          cartQuantity: qty,
          price
        };
        setCartProducts([...cartProducts, alteredProduct]);
      }
    }
  }, [product, qty]);
  return { setProductQty };
}

const useLocalstorageCart = localStorageKey => {
  const item = localStorage.getItem(localStorageKey) || "";
  const parsed = item ? JSON.parse(item) : [];
  const [localStorageCart, setLocalStorageCart] = React.useState(parsed);

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(localStorageCart));
  }, [localStorageCart, setLocalStorageCart]);

  const removeCart = () => {
    localStorage.removeItem(localStorageKey);
  };

  return { cart: localStorageCart, setCart: setLocalStorageCart, removeCart };
};
