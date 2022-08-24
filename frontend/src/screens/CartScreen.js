import React from "react";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Card,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart";

function CartScreen() {
  const { cart} = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeProductFromCartRequestHandler = (id) => {
    dispatch(cartActions.removeProductFromCartRequest(id));
  };

  const cartItemQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartPrice = cart
    .reduce((acc, item) => acc + item.quantity * item.product.price, 0)
    .toFixed(2);

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cart.length === 0 && (
          <Message variant="info">
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        )}
        {cart.length !== 0 && (
          <ListGroup variant="flush">
            {cart.map((item) => (
              <ListGroup.Item key={item.product._id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.product.image}
                      alt={item.product.image}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product._id}`}>
                      {item.product.name}
                    </Link>
                  </Col>
                  <Col md={2}>${item.product.price}</Col>
                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.product.quantity}
                      onChange={(e) =>
                        dispatch(
                          cartActions.addCartRequest({
                            id: item.product._id,
                            quantity: e.target.value,
                          })
                        )
                      }
                    >
                      {[...Array(item.product.countInStock).keys()].map(
                        (number) => (
                          <option key={number + 1} value={number + 1}>
                            {number + 1}
                          </option>
                        )
                      )}
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() =>
                        removeProductFromCartRequestHandler(item.product._id)
                      }
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItemQuantity}) {cartItemQuantity > 1 && "items"}{" "}
                {cartItemQuantity <= 1 && "item"}
              </h2>
              ${cartPrice}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type="button" className="btn-block" disabled={cart.length === 0}>
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
