import React, { useContext, useState, useEffect } from "react";

const CartContext = React.createContext();

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const totalPrice = cartProducts.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    setTotalPrice(totalPrice);
  }, [cartProducts]);

  const value = {
    cartProducts,
    setCartProducts,
    totalPrice
  };
  //   setLoading(false);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}

export function useUpdateCart() {
  const { setCartProducts, cartProducts } = useCart();
  // const [product, setProduct] = useState(null);
  const [{ product, qty }, setProductQty] = useState({ product: null, qty: 0 });

  useEffect(() => {
    if (product) {
      const { productName, slug, coverImage, price } = product;
      const existingProductIndex = cartProducts.findIndex(x => x.id == slug);

      if (existingProductIndex > -1) {
        const mappedProducts = cartProducts.map(x => {
          if (x.id == slug) {
            x = { ...x, quantity: qty, cartQuantity: qty };
          }
          return x;
        });
        setCartProducts(mappedProducts);
      } else {
        const alteredProduct = {
          productName,
          id: slug,
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
