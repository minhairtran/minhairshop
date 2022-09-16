import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { userProfileActions } from "../store/userProfile";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserProfileScreen = () => {
  const dispatch = useDispatch();
  const { userProfile, error, loading } = useSelector(
    (state) => state.userProfile
  );
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  useEffect(() => {
    dispatch(userProfileActions.getUserProfileRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userProfile) {
      setEmail(userProfile.email)
      setFirstName(userProfile.first_name)
      setLastName(userProfile.last_name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userProfileActions.updateUserProfileRequest({email, firstName, lastName}));
  };

  return (
    <Row>
      <Col xs={12} md={6}>
        <h2> User profile</h2>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        {userProfile && (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="firstName" className="mb-3">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="lastName" className="mb-3">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="lastLogin" className="mb-3">
              <Form.Label>Last login: {userProfile.last_login}</Form.Label>
            </Form.Group>
            <Form.Group controlId="dateJoined" className="mb-3">
              <Form.Label>Date joined: {userProfile.date_joined}</Form.Label>
            </Form.Group>
            <Button type="submit" variant="primary" className="mb-3">
              Update
            </Button>
          </Form>
        )}
        {userProfile && (
          <Link to="/change-password">
            <Button variant="primary" className="mb-3">
              Change password
            </Button>
          </Link>
        )}
      </Col>
    </Row>
  );
};

export default UserProfileScreen;
