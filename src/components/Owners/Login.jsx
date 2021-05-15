import React, { useContext, useState } from "react";
import { Context } from "../../Context/Store";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { string, object } from "yup";
import Swal from "sweetalert2";

import { Button, Container, Col, Row } from "react-bootstrap";

import ownerService from "../../services/owner.services";

const Login = (props) => {
  const history = useHistory();

  const [state, dispatch] = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);

  const loginSchema = object().shape({
    email: string()
      .email("The email you entered is not valid.")
      .required("Please, enter an email"),
    password: string().required("Please, enter a password"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    try {
      const data = JSON.stringify(values, null, 2);
      const body = JSON.parse(data);
      setSubmitting(false);

      let userData = await ownerService.postLogin(body);
      setIsLoading(false);
      dispatch({ type: "ADD_LOGGED_OWNED", payload: userData });

      localStorage.setItem("loggedUser", JSON.stringify(userData));

      Swal.fire(
        "Login Sucessful!",
        `Welcome back, ${userData.user.name}! Please, take a look at out registered pets!`,
        "success"
      ).then((_) => history.go(0));
      history.push(`/`);
    } catch (error) {
      setIsLoading(false);
      Swal.fire("Login Error!", `${error}`, "error");
      dispatch({ type: "ERROR_OWNER", payload: error });
    }
  };

  return (
    <Container fluid>
      <Row no-gutter>
        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
        <Col className="md-8 col-lg-6">
          <Col>
            <div className="login d-flex align-items-center py-5">
              <Container className="ml-5">
                <Row>
                  <Col className="md-9 col-lg-8 ml-5">
                    <h3 className="login-heading mb-4">
                      Welcome back, please log in!
                    </h3>
                    <Formik
                      initialValues={{
                        email: "",
                        password: "",
                      }}
                      validationSchema={loginSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <div className="field mb-4">
                            <p>Email address::</p>
                            <Field
                              type="email"
                              name="email"
                              placeholder="Email"
                            />
                            <ErrorMessage name="email" component="div">
                              {(msg) => (
                                <div style={{ color: "red" }}>{msg}</div>
                              )}
                            </ErrorMessage>
                          </div>
                          <div className="field mb-4">
                            <p>Password:</p>
                            <Field
                              type="password"
                              name="password"
                              placeholder="Password"
                            />
                            <ErrorMessage name="password" component="div">
                              {(msg) => (
                                <div style={{ color: "red" }}>{msg}</div>
                              )}
                            </ErrorMessage>
                          </div>

                          <div className=" pl-5 mt-5 align-items-center">
                            <Button
                              type="submit"
                              variant={isLoading ? "light" : "primary"}
                              className="btn btn-lg  btn-block btn-login text-uppercase font-weight-bold mb-3"
                              disabled={isSubmitting}
                            >
                              Sign in!
                            </Button>

                            <Button
                              variant="info"
                              onClick={(e) => history.push("/register")}
                              className=" btn-block btn-login text-uppercase font-weight-bold mb-2"
                            >
                              Register
                            </Button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
