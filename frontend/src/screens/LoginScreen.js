import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { userLoginActions } from "../store/userLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const dispatch = useDispatch();
  let location = useLocation();
  const { userLogin, error, loading } = useSelector((state) => state.userLogin);
  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLoginActions.logInRequest({ username: email, password }));
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userLogin) {
      navigate(redirect);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLogin, redirect]);

  const showPassHandler = (e) => {
    e.preventDefault();
    setShowPass((prevState) => !prevState);
  };

  useEffect(() => {
    if (!showPass) {
      setPasswordType("password");
    } else {
      setPasswordType("text");
    }
  }, [showPass]);

  return (
    <FormContainer>
      <h1>Login</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <div className="password">
            <Form.Control
              type={passwordType}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="ms-2">
              <i
                onClick={showPassHandler}
                className={showPass ? "fas fa-eye" : "fas fa-eye-slash"}
              ></i>
            </div>
          </div>
        </Form.Group>
        <Button type="submit" variant="primary" className="mb-3">
          Login
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
