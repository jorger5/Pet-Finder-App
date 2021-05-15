import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer";

const initialState = {
  owners: [],
  pets: [],
  townPets: [],
  loggedOwner: [JSON.parse(localStorage.getItem("loggedUser"))],
  error: null,
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
