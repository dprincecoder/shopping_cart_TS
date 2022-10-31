import React from "react";
import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShopingCartCtx";
import storeItem from "../data/items.json";
import { formatCurrency } from "../utils/formatCurrency";
type CartItemProps = {
  id: number | undefined;
  qty: number;
};

export const CartItem = ({ id, qty }: CartItemProps) => {
  const { removeFromCart } = useShoppingCart();
  const item = storeItem.find((item) => item.id === id);
  if (item === null) return null;
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item?.imgUrl}
        style={{ width: "125px", height: "100px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item?.name}
          {qty > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{qty}
            </span>
          )}
        </div>
        <div style={{ fontSize: ".75rem" }}>{formatCurrency(item?.price)}</div>
      </div>
      <div style={{ fontSize: ".75rem" }}>
        {formatCurrency(item?.price * qty)}
      </div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item?.id)}
      >
        &times;
      </Button>
    </Stack>
  );
};
