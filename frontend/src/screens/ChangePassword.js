import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { userProfileActions } from "../store/userProfile";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useDispatch();
  const { error, loading, passwordUpdateMessage } = useSelector((state) => state.userProfile);

  const submitHandler = (e) => {
    e.preventDefault();
    if ((oldPassword === "") || (newPassword === "") || (newPassword !== confirmNewPassword)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
      dispatch(
        userProfileActions.changePasswordRequest({ oldPassword, newPassword })
      );
    }
  };

  useEffect(() => {
    dispatch(
      userProfileActions.goToChangePasswordRequest()
    );
  },[])

  return (
    <FormContainer>
      <h2>Change password</h2>
      {error && <Message variant="danger">{error}</Message>}
      {passwordError && <Message variant="danger">Check Password</Message>}
      {passwordUpdateMessage && <Message variant="success">{passwordUpdateMessage}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="oldPassword" className="mb-3">
          <Form.Label>Old Password</Form.Label>
          <div className="password">
            <Form.Control
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              placeholder="Enter old password"
              onChange={(e) => setOldPassword(e.target.value)}
            ></Form.Control>
            <div className="ms-2">
              <i
                onClick={() => setShowOldPassword((prevState) => !prevState)}
                className={showOldPassword ? "fas fa-eye" : "fas fa-eye-slash"}
              ></i>
            </div>
          </div>
        </Form.Group>
        <Form.Group controlId="newPassword" className="mb-3">
          <Form.Label>New Password</Form.Label>
          <div className="password">
            <Form.Control
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              placeholder="Enter new password"
              onChange={(e) => setNewPassword(e.target.value)}
            ></Form.Control>
            <div className="ms-2">
              <i
                onClick={() => setShowNewPassword((prevState) => !prevState)}
                className={showNewPassword ? "fas fa-eye" : "fas fa-eye-slash"}
              ></i>
            </div>
          </div>
        </Form.Group>
        <Form.Group controlId="confirmNewPassword" className="mb-3">
          <Form.Label>Confirm New Password</Form.Label>
          <div className="password">
            <Form.Control
              type={showNewPassword ? "text" : "password"}
              value={confirmNewPassword}
              placeholder="Confirm new password"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            ></Form.Control>
            <div className="ms-2">
              <i
                onClick={() => setShowNewPassword((prevState) => !prevState)}
                className={showNewPassword ? "fas fa-eye" : "fas fa-eye-slash"}
              ></i>
            </div>
          </div>
        </Form.Group>
        <Button type="submit" variant="primary" className="mb-3">
          Change password
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ChangePassword;
