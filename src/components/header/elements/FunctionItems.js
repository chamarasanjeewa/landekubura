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

function FunctionItems({ hideTotal, hideWishlist = true }) {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData("cart-products");
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
              <span>{formatCurrency(calculateTotalPrice(data))}</span>
            ) : (
              <span>{formatCurrency(0)}</span>
            ))}
        </a>
      </Link>
    </div>
  );
}

export default React.memo(FunctionItems);
