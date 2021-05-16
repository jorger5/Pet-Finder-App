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
  const [isLoading, setIsLoading] = useState(true);
  const [ownerPets, setOwnerPets] = useState([]);
  const [townPets, setTownPets] = useState();
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/":
        return renderAllPets();
      case "/campinas":
      case "/saopaulo":
      case "/rio":
      case "/hortolandia":
      case "/campos":
        return renderTownPets();

      case "/my-pets":
        return renderMyPets();

      default:
        return renderAllPets();
    }
  };
  let loggedOwner = (state.loggedOwner[0] && state.loggedOwner[0].user) || {};

  const getPets = useCallback(async () => {
    setIsLoading(true);
    try {
      let response = await petService.getAll();
      let townPets;

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
      } else {
        switch (location.pathname) {
          case "/campinas":
            townPets = response.data.filter((pet) => pet.city === "Campinas");
            setTownPets(townPets);

            dispatch({ type: "GET_TOWN_PETS", payload: townPets });
            break;
          case "/saopaulo":
            townPets = response.data.filter((pet) => pet.city === "Sao Paulo");
            setTownPets(townPets);

            dispatch({ type: "GET_TOWN_PETS", payload: townPets });
            break;
          case "/hortolandia":
            townPets = response.data.filter(
              (pet) => pet.city === "Hortolandia"
            );
            setTownPets(townPets);

            dispatch({ type: "GET_TOWN_PETS", payload: townPets });
            break;
          case "/campos":
            townPets = response.data.filter(
              (pet) => pet.city === "Campos do Jordao"
            );
            setTownPets(townPets);

            dispatch({ type: "GET_TOWN_PETS", payload: townPets });
            break;
          case "/rio":
            townPets = response.data.filter(
              (pet) => pet.city === "Rio de Janeiro"
            );
            setTownPets(townPets);

            dispatch({ type: "GET_TOWN_PETS", payload: townPets });
            break;
          default:
            break;
        }
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
    let pets = townPets;

    return pets.map((pet) => {
      return (
        <Pet
          key={pet.id}
          pet={pet}
          owner={loggedOwner}
          loggedOwner={loggedOwner}
        />
      );
    });
  };

  const renderAllPets = () => {
    let pets = state.pets;

    return pets.map((pet) => {
      return (
        <Pet
          key={pet.id}
          pet={pet}
          owner={loggedOwner}
          loggedOwner={loggedOwner}
        />
      );
    });
  };
  const renderMyPets = () => {
    if (ownerPets) {
      return ownerPets.pets.map((pet) => {
        return (
          <Pet
            key={pet.id}
            pet={pet}
            owner={ownerPets.owner}
            loggedOwner={loggedOwner}
          />
        );
      });
    } else {
      return null;
    }
  };

  const renderTitle = () => {
    switch (location.pathname) {
      case "/":
        return "These are all of our registered pets!";
      case "/campinas":
        return `These are our registered pets in Campinas`;
      case "/saopaulo":
        return `These are our registered pets in Sao Paulo`;
      case "/rio":
        return `These are our registered pets in Rio de Janeiro`;
      case "/hortolandia":
        return `These are our registered pets in Hortolandia`;
      case "/campos":
        return `These are our registered pets in Campos do Jordao`;
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
