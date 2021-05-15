import API from "./config.services";

const OWNER_ENDPOINT = {
  LIST_OWNER: "/owners",
  OWNER_DATA: "/owners/",
  OWNER_PET_DATA: "/owners/",
  CREATE_OWNER: "/create-owner",
  LOGIN: "/sign_in",
  REGISTER: "/register",
};

const ownerService = {
  getAll: async () => {
    try {
      let response = await API.get(OWNER_ENDPOINT.LIST_OWNER);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  get: async (id) => {
    try {
      let response = await API.get(OWNER_ENDPOINT.OWNER_DATA + id);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  getOwnerPets: async (id) => {
    try {
      let response = await API.get(`${OWNER_ENDPOINT.OWNER_DATA + id}/pets`);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  post: async (data) => {
    try {
      let response = await API.post(OWNER_ENDPOINT.CREATE_OWNER, data);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  delete: async (id) => {
    try {
      let response = API.delete(OWNER_ENDPOINT.OWNER_DATA + id);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  update: async (data, id) => {
    try {
      let response = API.put(OWNER_ENDPOINT.OWNER_DATA + id, data);
      console.log(response);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  postLogin: async (data) => {
    try {
      let response = await API.post(OWNER_ENDPOINT.LOGIN, data);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  postRegister: async (data) => {
    try {
      let response = await API.post(OWNER_ENDPOINT.REGISTER, data);

      return response.data;
    } catch (error) {
      return error;
    }
  },
};

export default ownerService;
