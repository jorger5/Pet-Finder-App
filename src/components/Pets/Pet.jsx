import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { Context } from "../../Context/Store";
import ownerService from "../../services/owner.services";

const Pet = (props) => {
  const [state, dispatch] = useContext(Context);
  const { pet, owner, loggedOwner } = props;
  const [deleted, setDeleted] = useState(false);
  const location = useLocation();
  let petOwner;

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const renderCondition = () => {
    if (location.pathname === "/my-pets") {
      if (isEmpty(pet)) {
        return true;
      } else {
        return deleted;
      }
    } else {
      return false;
    }
  };

  if (location.pathname === "/") {
    petOwner = pet.owner[0].user;
  } else {
    petOwner = owner;
  }

  const handleAddPet = async () => {
    if (isPetAdded()) {
      Swal.fire(
        `${pet.name} is already on your list!`,
        "Please, choose another animal if you want",
        "info"
      );
    } else {
      try {
        let loggedOwnerPets = loggedOwner.pets;
        let newPets = {
          name: pet.name,
          race: pet.race,
          age: pet.age,
          type: pet.type,
          weight: pet.weight.toString(),
          city: pet.city,
          _id: pet._id,
        };

        loggedOwnerPets.push(newPets);
        let body = {
          pets: loggedOwnerPets,
        };

        await ownerService.update(body, loggedOwner._id);
        Swal.fire(
          `You added ${pet.name} to your list!`,
          "Hope it will soon find a good place with you :)",
          "success"
        );
      } catch (error) {
        Swal.fire(
          `There was an error!`,
          `We couldn't add ${pet.name} to your list! Try again please.`,
          "error"
        );
      }
    }
  };

  const handleDeletePet = async () => {
    try {
      let loggedOwnerPets = loggedOwner.pets;
      let newPets;
      if (loggedOwnerPets.length > 1) {
        newPets = loggedOwnerPets.filter((p) => p._id !== pet._id);
      } else {
        newPets = {};
      }

      let body = {
        pets: newPets,
      };

      await ownerService.update(body, loggedOwner._id);

      dispatch({ type: "DELETE_PET_OF_OWNER", payload: pet._id });

      Swal.fire(
        `You deleted ${pet.name} off your list`,
        "Hope you will reconsider",
        "info"
      );
      setDeleted(true);
    } catch (error) {
      Swal.fire(
        `There was an error!`,
        `We couldn't remove ${pet.name} off your list! `,
        "error"
      );
    }
  };

  const isPetAdded = () => {
    return loggedOwner.pets.some((p) => p._id === pet._id);
  };

  if (renderCondition()) {
    return null;
  } else {
    return (
      <div class="infocardContainer">
        <div id="main">
          <img
            alt="pet_pic"
            src={`https://placedog.net/${Math.floor(Math.random() * 501)}`}
          ></img>
        </div>
        <div id="textbois">
          <h2>{`${pet.name}, ${pet.race}`}</h2>
          <p>{`${pet.name} is ${pet.age} years old, weights ${pet.weight} kgs`}</p>
          <p>{`Located in ${pet.city}!`}</p>

          <p>
            {petOwner
              ? `Registered by ${petOwner.name}`
              : "No information about owner"}
          </p>
          <div id="hotlinks">
            <a href={`tel:+551999999999`}>
              <img
                src="https://image.flaticon.com/icons/png/128/455/455705.png"
                alt="phoneTo"
              ></img>
            </a>
            <a
              href={`mailto: ${petOwner ? petOwner.email : "admin@petfinder"}`}
            >
              <img
                src="https://img-premium.flaticon.com/png/512/1782/1782765.png?token=exp=1621053681~hmac=f29069661f1a8edcb936c91ef29b35c5"
                alt="mailTo"
              ></img>
            </a>
            {!!loggedOwner.loggedIn && (
              <>
                <a>
                  <img
                    src={
                      isPetAdded()
                        ? "https://image.flaticon.com/icons/png/128/711/711239.png"
                        : "https://image.flaticon.com/icons/png/128/1828/1828919.png"
                    }
                    alt="phoneTo"
                    onClick={handleAddPet}
                  ></img>
                </a>
                {isPetAdded() && (
                  <a>
                    <img
                      src="https://image.flaticon.com/icons/png/128/1450/1450571.png"
                      alt="phoneTo"
                      onClick={handleDeletePet}
                    ></img>
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
};
export default Pet;
