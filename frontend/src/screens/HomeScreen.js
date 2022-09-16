import React, { useEffect, useState } from "react";
import { Row, Col, DropdownButton, Dropdown } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch } from "react-redux";
import { productActions } from "../store/product";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Pagination, InputGroup, Form, ListGroup } from "react-bootstrap";

function HomeScreen() {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.product);
  const orderingTypes = [
    { name: "Price", id: "price" },
    { name: "Count in stock", id: "countInStock" },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [orderType, setOrderType] = useState("");
  const [linePerPage, setLinePerPage] = useState(2);

  useEffect(() => {
    const params = `?ordering=${orderType}&page_size=${linePerPage}&page=${currentPage}`;
    dispatch(productActions.listProductsRequest({ params }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToPage = (e, page) => {
    e.preventDefault();
    const params = `?ordering=${orderType}&page_size=${linePerPage}&page=${page}`;
    dispatch(productActions.listProductsRequest({ params }));
    setCurrentPage(page);
  };

  const goToFirstPage = (e) => {
    e.preventDefault();
    const params = `?ordering=${orderType}&page_size=${linePerPage}&page=1`;
    dispatch(productActions.listProductsRequest({ params }));
    setCurrentPage(1);
  };

  const goPrevious = (e) => {
    e.preventDefault();
    const params = `?ordering=${orderType}&page_size=${linePerPage}&page=${currentPage - 1}`;
    dispatch(productActions.listProductsRequest({ params }));

    setCurrentPage((prevState) => prevState - 1);
  };

  const goNext = (e) => {
    e.preventDefault();
    const params = `?ordering=${orderType}&page_size=${linePerPage}&page=${currentPage + 1}`;
    dispatch(productActions.listProductsRequest({ params }));
    setCurrentPage((prevState) => prevState + 1);
  };

  const goToLastPage = (e) => {
    e.preventDefault();
    const lastPageNumber = Math.ceil(products.count / linePerPage);
    const params = `?ordering=${orderType}&page_size=${linePerPage}&page=${lastPageNumber}`;
    dispatch(productActions.listProductsRequest({ params }));

    setCurrentPage(lastPageNumber);
  };

  const handleLinePerPage = (e) => {
    e.preventDefault();

    const newLinePerPage = e.target.value;
    setLinePerPage(newLinePerPage);

    if (newLinePerPage >= 1 || newLinePerPage <= 50) {
      const params = `?ordering=${orderType}&page_size=${newLinePerPage}&page=1`;
      dispatch(productActions.listProductsRequest({ params }));
      setCurrentPage(1);
    }
  };

  return (
    <div>
      Lastest Products
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <DropdownButton
        id="products-ordering"
        variant="outline-dark"
        title={orderType ? orderType : "order"}
        onSelect={(e) => setOrderType(e)}
      >
        {orderingTypes.map((orderingType, id) => (
          <Dropdown.Item key={id} eventKey={orderingType.id}>
            {orderingType.name}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      {products.length !== 0 && (
        <Row>
          {products.results.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
      {products.length !== 0 && (
        <ListGroup horizontal="sm" variant="flush">
          <ListGroup.Item>
            <Pagination>
              {products.previous && (
                <Pagination.First onClick={(e) => goToFirstPage(e)} />
              )}
              {products.previous && (
                <Pagination.Prev onClick={(e) => goPrevious(e)} />
              )}
              {currentPage - 2 > 0 && <Pagination.Ellipsis />}
              {products.previous && (
                <Pagination.Item onClick={(e) => goToPage(e, currentPage - 1)}>
                  {currentPage - 1}
                </Pagination.Item>
              )}
              <Pagination.Item active>{currentPage}</Pagination.Item>
              {products.next && (
                <Pagination.Item onClick={(e) => goToPage(e, currentPage + 1)}>
                  {currentPage + 1}
                </Pagination.Item>
              )}
              {currentPage + 1 < Math.ceil(products.count / linePerPage) && (
                <Pagination.Ellipsis />
              )}
              {products.next && <Pagination.Next onClick={(e) => goNext(e)} />}
              {products.next && (
                <Pagination.Last onClick={(e) => goToLastPage(e)} />
              )}
            </Pagination>
          </ListGroup.Item>
          <ListGroup.Item>
            <InputGroup className="mb-3">
              <InputGroup.Text id="line-per-page">
                Line per page: {linePerPage}
              </InputGroup.Text>
              <Form.Control
                placeholder="Enter line per page (max: 50)"
                aria-describedby="line-per-page"
                value={linePerPage}
                onChange={(e) => handleLinePerPage(e)}
              />
            </InputGroup>
          </ListGroup.Item>
        </ListGroup>
      )}
    </div>
  );
}

export default HomeScreen;
