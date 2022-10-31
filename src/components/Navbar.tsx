import React from "react";
import { Navbar as NavbarBs, Container, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShopingCartCtx";

export const Navbar = () => {
  const { openCart, cartQty } = useShoppingCart();
  return (
    <NavbarBs bg="dark" sticky="top" variant="dark" className="mb-3 p-1">
      <Container>
        <NavbarBs.Brand href="/">dprince Store</NavbarBs.Brand>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/store" as={NavLink}>
            Store{" "}
          </Nav.Link>
          <Nav.Link to="/about" as={NavLink}>
            About
          </Nav.Link>
        </Nav>
        {cartQty > 0 && (
          <Button
            onClick={openCart}
            className="cart-svg rounded-circle bg-primary"
            variant="outline-primary"
            style={{ width: "3rem", height: "3rem", position: "relative" }}
          >
            <img src="cartsvg.svg" alt="cart btn" style={{ width: "20px" }} />
            <div
              className=" rounded-circle bg-danger d-flex justify-content-center align-items-center text-white"
              style={{
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                bottom: "0",
                right: "0",
                transform: "translate(25%, 25%)",
              }}
            >
              {cartQty}
            </div>
          </Button>
        )}
      </Container>
    </NavbarBs>
  );
};
