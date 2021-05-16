import React, { useContext, useState, useEffect } from "react";
import { Nav, Navbar, Button, NavDropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

import logo from "./petlogo.png";
import { Context } from "../../Context/Store";

const Header = (props) => {
  const { currentLoc } = props;
  const [state, dispatch] = useContext(Context);
  const [loggedUser, setLoggedUser] = useState();
  const history = useHistory();

  const inTown = () => {
    switch (currentLoc) {
      case "/campinas":
        return "Campinas";
      case "/saopaulo":
        return "Sao Paulo";
      case "/campos":
        return "Campos do Jordao";
      case "/rio":
        return "Rio de Janeiro";
      case "/hortolandia":
        return "Hortolandia";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (state.loggedOwner[0] && state.loggedOwner[0].user) {
      setLoggedUser(state.loggedOwner[0].user);
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
    if (loggedUser) {
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
          {loggedUser && (
            <NavDropdown
              title={`View pets in by town: now viewing ${inTown()}`}
              id="basic-nav-dropdown"
              className="mx-2"
            >
              <NavDropdown.Item href={"/campinas"}>
                View pets in Campinas
              </NavDropdown.Item>
              <NavDropdown.Item href={"/saopaulo"}>
                View pets in Sao Paulo
              </NavDropdown.Item>
              <NavDropdown.Item href={"/hortolandia"}>
                View pets in Hortolandia
              </NavDropdown.Item>
              <NavDropdown.Item href={"/campos"}>
                View pets in Campos do Jordao
              </NavDropdown.Item>
              <NavDropdown.Item href={"/rio"}>
                View pets in Rio de Janeiro
              </NavDropdown.Item>
            </NavDropdown>
          )}
          <NavDropdown
            title="Pets Menu"
            id="basic-nav-dropdown"
            className="mx-2"
          >
            <NavDropdown.Item href={loggedUser ? "/my-pets" : "/login"}>
              View my pets
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href={loggedUser ? "/create-pet" : "/login"}>
              Register a pet
            </NavDropdown.Item>
          </NavDropdown>
          {loggedUser && (
            <Navbar.Text>Welcome back, {loggedUser.name}</Navbar.Text>
          )}
          {renderLoginLink()}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
