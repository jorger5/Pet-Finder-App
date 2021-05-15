import React, { useContext } from "react";
import { Context } from "../../Context/Store";
import { useHistory } from "react-router-dom";

import { Button, Container, Row } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { string, object } from "yup";
import Swal from "sweetalert2";

import petService from "../../services/pet.services";
import Login from "../Owners/Login";
import ownerService from "../../services/owner.services";

const RegisterPet = () => {
  const [state, dispatch] = useContext(Context);

  const history = useHistory();
  const loggedUser = state.loggedOwner[0].user;

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const data = JSON.stringify(values, null, 2);
      const body = JSON.parse(data);
      let updatePets = loggedUser.pets;
      updatePets.push(body);

      const updatePetOwner = {
        pets: updatePets,
      };
      await ownerService.update(updatePetOwner, state.loggedOwner[0].user._id);
      body.owner = state.loggedOwner;

      setSubmitting(false);

      await petService.post(body);
      Swal.fire(
        "You have registered a pet!",
        "It will soon find a good place :)",
        "success"
      );
      history.push("/");
    } catch (error) {
      Swal.fire("There was an error!", `${error}`, "error");
    }
  };

  const RegisterPetSchema = object().shape({
    name: string().required("Please, tell us the name of the pet."),
    type: string().required(
      "We need to know if it is a cat or dog! They can't be in the same place!"
    ),
    race: string().required("Any particular race?!"),
    age: string().required("We need to know how old it is!"),
    weight: string().required("We need to know how much it weights!"),
    city: string().required(
      "We need to know where did you find it or where is it from!"
    ),
  });

  if (state.loggedOwner[0].user.loggedIn) {
    return (
      <Container fluid>
        <h1>Please, fill out this form to register a pet</h1>

        <Formik
          initialValues={{
            name: "",
            type: "Cat",
            race: "",
            age: "",
            weight: "",
            city: "Campinas",
          }}
          validationSchema={RegisterPetSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Row className="form_container">
              <Form>
                <div className="field mb-4">
                  <p>Name:</p>
                  <Field name="name" placeholder="What's its name?" />
                  <ErrorMessage name="name" component="div">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </div>

                <div className="field mb-4">
                  <p>Type:</p>
                  <Field
                    name="type"
                    placeholder="Is it a cat or a dog?"
                    as="select"
                  >
                    <option>Cat</option>
                    <option>Dog</option>
                  </Field>
                  <ErrorMessage name="city" component="div">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="field mb-4">
                  <p>Race:</p>
                  <Field
                    type="race"
                    name="race"
                    placeholder="What's its race?"
                  />
                  <ErrorMessage name="race" component="div">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="field mb-4">
                  <p>Age:</p>{" "}
                  <Field
                    name="age"
                    placeholder="Any idea of its age? Type it in years"
                  />
                  <ErrorMessage name="age" component="div">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="field mb-4">
                  <p>Weight:</p>{" "}
                  <Field
                    name="weight"
                    placeholder="Any idea of its weight? (in kg)"
                  />
                  <ErrorMessage name="weight" component="div">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="field mb-4">
                  <p>City:</p>{" "}
                  <Field
                    name="city"
                    placeholder="Where did you find it?"
                    as="select"
                  >
                    <option>Campinas</option>
                    <option>Sao Paulo</option>
                    <option>Hortolandia</option>
                    <option>Campos do Jordao</option>
                    <option>Rio de Janeiro</option>
                  </Field>
                  <ErrorMessage name="city" component="div" />
                </div>
                <div className="inline clearfix">
                  <Button
                    className="mb-5"
                    variant="primary"
                    size="md"
                    block="block"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Register the pet!
                  </Button>
                </div>
              </Form>
            </Row>
          )}
        </Formik>
      </Container>
    );
  } else {
    <Login />;
  }
};
export default RegisterPet;
