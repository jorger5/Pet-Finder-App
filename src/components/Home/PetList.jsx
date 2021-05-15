import React, { useEffect, useContext, useCallback, useState } from "react";
import { Context } from "../../Context/Store";
import { useLocation } from "react-router-dom";
import Loader from "react-loader-spinner";

import petService from "../../services/pet.services";
import Pet from "../Pets/Pet";
import ownerService from "../../services/owner.services";

const PetList = () => {
  const [state, dispatch] = useContext(Context);
  const [allPets, setAllPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ownerPets, setOwnerPets] = useState([]);
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/":
        return renderAllPets();
      case "/my-town":
        return renderTownPets();

      case "/my-pets":
        return renderMyPets();

      default:
        return renderAllPets();
    }
  };
  const loggedOwner = (state.loggedOwner[0] && state.loggedOwner[0].user) || {};

  const getPets = useCallback(async () => {
    setIsLoading(true);
    try {
      let response = await petService.getAll();

      setAllPets(response.data);

      dispatch({ type: "GET_PETS", payload: response.data });
      if (location.pathname === "/my-town") {
        let townPets = response.data.filter(
          (pet) => pet.city === loggedOwner.city
        );
        dispatch({ type: "GET_TOWN_PETS", payload: townPets });
      } else if (location.pathname === "/my-pets") {
        let response = await ownerService.getOwnerPets(loggedOwner._id);

        setOwnerPets(response.data);
      }
      setIsLoading(false);
    } catch (error) {
      dispatch({ type: "ERROR_OWNER", payload: error });
    }
  }, [location.pathname, dispatch, loggedOwner.city, loggedOwner._id]);

  useEffect(() => {
    getPets();
  }, [getPets]);

  const renderTownPets = () => {
    if (state.loggedOwner[0]) {
      let pets = state.townPets;

      return pets.map((pet) => {
        return <Pet key={pet.id} pet={pet} />;
      });
    } else {
      return null;
    }
  };

  const renderAllPets = () => {
    let pets = state.pets;

    return pets.map((pet) => {
      return <Pet key={pet.id} pet={pet} />;
    });
  };
  const renderMyPets = () => {
    let owner = null;
    if (state.loggedOwner[0]) {
      owner = state.loggedOwner[0];
    }
    if (ownerPets) {
      return ownerPets.map((pet) => {
        return <Pet key={pet.id} pet={pet} owner={owner.user} />;
      });
    } else {
      return null;
    }
  };

  const renderTitle = () => {
    switch (location.pathname) {
      case "/":
        return "There are all of our registered pets!";
      case "/my-town":
        return `These are our registered pets in ${loggedOwner.city}`;
      case "/my-pets":
        return `These are the pets you've registered`;
      default:
        return "There are all of our registered pets!";
    }
  };

  return (
    <>
      <h1>{renderTitle()}</h1>

      {!isLoading && allPets && renderContent()}
      {isLoading && !allPets && (
        <div className="infocardContainer">
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            visible={isLoading}
          />
        </div>
      )}
      {}
    </>
  );
};

export default PetList;
