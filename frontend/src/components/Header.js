import React, { useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store/user";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(userActions.logOutRequest());
  };

  useEffect(() => {
    if (!user) {
      navigate("/login/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>minHairShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {user && (
              <Nav className="mr-auto">
                <LinkContainer to="/cart/">
                  <Nav.Link>
                    <i className="fas fa-shopping-cart"></i>Cart
                  </Nav.Link>
                </LinkContainer>
                <NavDropdown title={user.username} id="username">
                  <LinkContainer to="profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
            {!user && (
              <Nav className="mr-auto">
                <LinkContainer to="/login/">
                  <Nav.Link>
                    <i className="fas fa-user"></i>Login
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
