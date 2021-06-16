import Link from "next/link";
import React, { useEffect } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from "react-query";
import { formatCurrency } from "../../../common/utils";
import { calculateTotalPrice } from "../../../common/shopUtils";
import {
  getCartProducts,
  deleteCartProducts,
  updateCartProducts,
  onRemoveProductFromCart
} from "../../../services/cartService";
import { cartAuth, useCart } from "../../../context/CartContext";


function FunctionItems({ hideTotal, hideWishlist = true }) {
  console.log("rerender function items....");
  const queryClient = useQueryClient();
  const { totalPrice } = useCart();

  const { isLoading, error, data } = useQuery("cart-products", getCartProducts);

  //const data = queryClient.getQueryCache("cart-products");
  return (
    <div className="function-items">
      {!hideWishlist && (
        <Link href={process.env.PUBLIC_URL + "/shop/wishlist"}>
          <a className="function-items-item">
            <i className="icon_heart_alt" />
          </a>
        </Link>
      )}

      <Link href={process.env.PUBLIC_URL + "/shop/cart"}>
        <a className="function-items-item">
          <i className="icon_bag_alt" />

          {!hideTotal &&
            (data ? (
              // <span>{formatCurrency(calculateTotalPrice(data))}</span>
              <span>{formatCurrency(totalPrice)}</span>
            ) : (
              <span>{formatCurrency(0)}</span>
            ))}
        </a>
      </Link>
    </div>
  );
}

export default React.memo(FunctionItems);
