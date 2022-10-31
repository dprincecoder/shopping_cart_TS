import React from "react";
import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShopingCartCtx";
import { formatCurrency } from "../utils/formatCurrency";
type storeItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};
export const StoreItem = ({ id, name, price, imgUrl }: storeItemProps) => {
  const { getItemQty, decreementCartQty, increementCartQty, removeFromCart } =
    useShoppingCart();
  const qty: number = getItemQty(id);
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="400px"
        style={{ objectFit: "cover", width: "100%" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {qty === 0 ? (
            <Button className="w-100" onClick={() => increementCartQty(id)}>
              + Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex flex-column align-items-center"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreementCartQty(id)}>-</Button>
                <div>
                  <span className="fs-3">{qty}</span> in cart
                </div>
                <Button onClick={() => increementCartQty(id)}>+</Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromCart(id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};
