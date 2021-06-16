import React, { useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {getCartProducts,updateCartProducts} from "./../services/cartService"
import {
  useQuery,
  useQueryClient,useMutation
} from "react-query";

const CartContext = React.createContext();

export function CartProvider({ children }) {

  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);
 const[cart,setCart]= useLocalstorageCart('shopping-cart');
 const { currentUser } = useAuth();
 //const queryClient=useQueryClient();
 const { isLoading, error, data }=useQuery('cart-products', getCartProducts);
 const updateProductMutation = useMutation(cartItem =>
  updateCartProducts(cartItem),{onSuccess: (data, variables, context) => {
    // Boom baby!
    console.log('boom baby!');
   // queryClient.invalidateQueries('cart-products')
  },}
);


 useEffect(() => {
   //if not logged in set products from local storage
   if(currentUser){
  //    setLoading(true)
  // if(isLoading) return;
  // setLoading(false);
  setCartProducts(data??[]);

   }else{
    setCartProducts(cart);

   }
   // else set from server
 },[])

  useEffect(() => {
    const totalPrice = cartProducts.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    setTotalPrice(totalPrice);
    if(currentUser){
      cartProducts.forEach(item=>{
        updateProductMutation.mutate({ ...item,userId:currentUser.uid })
      });
      setCartProducts(cartProducts);
     
    }else{
      setCart(cartProducts);
    }

  }, [cartProducts, setCartProducts]);

  const value = {
    cartProducts,
    setCartProducts,
    totalPrice
    //setRemovableProduct
  };
  //   setLoading(false);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}

export function useRemoveProductFromCart() {
  const { setCartProducts, cartProducts } = useCart();
  const [product, setRemovableProduct] = useState(null);
  const [removeAll, setRemoveAll] = useState(false);

  useEffect(() => {
    if (product) {
      const filteredProducts = cartProducts.filter(x => x.id != product.id);
      setCartProducts(filteredProducts);
    }
  }, [product, setRemovableProduct]);

  useEffect(() => {
    if (removeAll) {
      setCartProducts([]);
    }
  }, [removeAll, setRemoveAll]);

  return { setRemovableProduct, setRemoveAll };
}

export function useUpdateCart() {
  const { setCartProducts, cartProducts } = useCart();
  const [{ product, qty }, setProductQty] = useState({ product: null, qty: 0 });

  useEffect(() => {
    if (product) {
      const { productName, slug, coverImage, price } = product;
      const productExists = cartProducts.find(x => x.id == slug);

      if ( productExists) {
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
          slug,//same as product id
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
  const item=localStorage.getItem(localStorageKey) ||"";
 const parsed= item? JSON.parse(item):[]
  const [cart, setCart] = React.useState(parsed
  );
 
  React.useEffect(() => {
    localStorage.setItem(localStorageKey,JSON.stringify(cart));
  }, [cart,setCart]);
 
  return [cart, setCart];
};
 
