import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch } from "react-redux";
import { productActions } from "../store/product";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";

function HomeScreen() {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(productActions.listProductsRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      Lastest Products
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {products && (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
