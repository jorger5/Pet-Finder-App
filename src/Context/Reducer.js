const Reducer = (state, action) => {
  switch (action.type) {
    case "GET_OWNERS":
      return {
        ...state,
        owners: action.payload,
      };
    case "ADD_OWNER":
      return {
        ...state,
        owners: [...state.owners, action.payload],
      };
    case "ADD_LOGGED_OWNED":
      return {
        ...state,
        loggedOwner: [...state.loggedOwner, action.payload],
      };
    case "DELETE_OWNERS":
      return {
        ...state,
        owners: state.owners.filter((owner) => owner._id !== action.payload),
      };
    case "ERROR_OWNER":
      return {
        ...state,
        error: action.payload,
      };

    case "GET_PETS":
      return {
        ...state,
        pets: action.payload,
      };
    case "GET_TOWN_PETS":
      return {
        ...state,
        townPets: action.payload,
      };
    case "ADD_PET":
      return {
        ...state,
        pets: [...state.pets, action.payload],
      };
    case "DELETE_PETS":
      return {
        ...state,
        pets: state.pets.filter((owner) => owner._id !== action.payload),
      };
    case "ERROR_PET":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default Reducer;
