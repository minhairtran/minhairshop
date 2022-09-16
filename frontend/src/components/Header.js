import React, { useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { userLoginActions } from "../store/userLogin";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Header() {
  const { userLogin, loading } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(userLoginActions.logOutRequest());
  };

  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!access_token) {
      navigate("/login/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access_token ]);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>minHairShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {access_token && (
              <Nav className="mr-auto">
                <LinkContainer to="/cart/">
                  <Nav.Link>
                    <i className="fas fa-shopping-cart"></i>Cart
                  </Nav.Link>
                </LinkContainer>
                <NavDropdown
                  title={userLogin && userLogin.username}
                  id="username"
                >
                  <LinkContainer to="user-profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
            {!access_token && (
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
