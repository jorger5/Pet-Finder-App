import React from "react";

import { useHistory } from "react-router-dom";

import { Container, Button, Row } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { string, object } from "yup";
import Swal from "sweetalert2";

import ownerService from "../../services/owner.services";

const RegisterOwner = () => {
  const history = useHistory();

  const SignupSchema = object().shape({
    name: string().required("Please, tell us your name."),
    email: string()
      .email("The email you entered is not valid.")
      .required("You need a mail to register"),
    address: string().required("We need your address!"),
    city: string().required("We need to know the city where you live!"),
    password: string()
      .required("You need a password to protect your account")
      .min(6, "Your password is too short"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const data = JSON.stringify(values, null, 2);
      const body = JSON.parse(data);
      setSubmitting(false);

      await ownerService.postRegister(body);
      Swal.fire(
        "You have registered!",
        "Please, log in and find a pet!",
        "success"
      ).then((_) => history.go(0));
      history.push("/");
    } catch (error) {
      Swal.fire("There was an error!", `${error}`, "error");
    }
  };

  return (
    <Container>
      <Row className="align-items-center">
        <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
          <img
            src="https://i.pinimg.com/originals/8e/e3/33/8ee333af01911a01ae752edf07fc8b1f.png"
            alt=""
            className="img-fluid mb-3 d-none d-md-block"
          />
          <h1> Register in our site</h1>
          <p className="font-italic text-muted mb-0">
            There are so many animals lost! Please, help us find them a great
            place to call home!
          </p>
        </div>

        <div className="col-md-7 col-lg-6 ml-auto">
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              address: "",
              city: "Campinas",
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Row className="form_container">
                <Form>
                  <div className="field mb-4">
                    <p>Name:</p>
                    <Field name="name" placeholder="Write your name here" />
                    <ErrorMessage name="name" component="div">
                      {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <div className="field mb-4">
                    <p>Email Address:</p>

                    <Field
                      type="email"
                      name="email"
                      placeholder="Write your email here"
                    />
                    <ErrorMessage name="email" component="div">
                      {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                    </ErrorMessage>
                  </div>
                  <div className="field mb-4">
                    <p>Password:</p>

                    <Field
                      type="password"
                      name="password"
                      placeholder="Write your password:"
                    />
                    <ErrorMessage name="password" component="div">
                      {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <div className="field mb-4">
                    <p>Address:</p>

                    <Field name="address" placeholder="Write your address" />
                    <ErrorMessage name="address" component="div">
                      {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                    </ErrorMessage>
                  </div>
                  <div className="field mb-4">
                    <p>City:</p>
                    <Field
                      name="city"
                      placeholder="Select your city"
                      as="select"
                    >
                      <option>Campinas</option>
                      <option>Sao Paulo</option>
                      <option>Hortolandia</option>
                      <option>Campos do Jordao</option>
                      <option>Rio de Janeiro</option>
                    </Field>
                    <ErrorMessage name="city" component="div">
                      {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                    </ErrorMessage>
                  </div>
                  <div className="inline clearfix  mb-5">
                    <Button
                      variant="primary"
                      size="md"
                      block="block"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Register now
                    </Button>
                  </div>
                </Form>
              </Row>
            )}
          </Formik>
        </div>
      </Row>
    </Container>
  );
};
export default RegisterOwner;
