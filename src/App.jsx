import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";

import RegisterPet from "./components/Pets/RegisterPet";
import RegisterOwner from "./components/Owners/RegisterOwner";

import PetList from "./components/Home/PetList";

import Header from "./components/Header/Header.jsx";
import Login from "./components/Owners/Login";

function App() {
  let location = useLocation();
  let currentLoc = location.pathname;

  return (
    <Router>
      <Container fluid>
        <Row>
          <Header />
        </Row>

        <Row className="content_row">
          <Col>
            <Switch>
              <Route exact path={["/", "/my-town", "/my-pets"]}>
                <PetList path={currentLoc} />
              </Route>
              <Route path="/create-pet">
                <RegisterPet />
              </Route>
              <Route exact path="/register">
                <RegisterOwner />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
