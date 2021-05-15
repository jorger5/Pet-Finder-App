import React, { useContext, useState, useEffect } from "react";
import { Nav, Navbar, Button, NavDropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

import logo from "./petlogo.png";
import { Context } from "../../Context/Store";

const Header = (props) => {
  const [state, dispatch] = useContext(Context);
  const [userLogged, setUserLogged] = useState();
  const history = useHistory();

  useEffect(() => {
    if (state.loggedOwner[0] && state.loggedOwner[0].user) {
      setUserLogged(state.loggedOwner[0].user);
    }
  }, [state.loggedOwner]);
  const handleLogOut = () => {
    localStorage.clear();
    Swal.fire(
      "Logged out",
      "You have successfully logged out, come back soon!",
      "success"
    ).then((_) => history.go(0));
    history.push("/");
  };
  const renderLoginLink = () => {
    if (userLogged) {
      return (
        <Button variant="dark" onClick={handleLogOut}>
          Sign out
        </Button>
      );
    } else {
      return (
        <Link to={"/login"} className="nav-link">
          Sign in
        </Link>
      );
    }
  };

  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Navbar.Brand href="/">
        <img
          alt=""
          src={logo}
          width="50"
          height="50"
          className="d-inline-block align-center"
        />{" "}
        Pet Finder
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav
          className="mr-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <Link to={"/"} className="nav-link">
            View All Registered Pets
          </Link>
        </Nav>
        <Nav>
          {userLogged && (
            <Link to={"/my-town"} className="nav-link">
              View Pets in my town {userLogged.city}
            </Link>
          )}
          <NavDropdown
            title="Pets Menu"
            id="basic-nav-dropdown"
            className="mx-2"
          >
            <NavDropdown.Item href={userLogged ? "/my-pets" : "/login"}>
              View my pets
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href={userLogged ? "/create-pet" : "/login"}>
              Register a pet
            </NavDropdown.Item>
          </NavDropdown>
          {userLogged && (
            <Navbar.Text>Welcome back, {userLogged.name}</Navbar.Text>
          )}
          {renderLoginLink()}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
