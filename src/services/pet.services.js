import API from "./config.services";

const PET_ENDPOINT = {
  LIST_PET: "/pets",
  PET_DATA: "/pets/",
  CREATE_PET: "/create-pet",
};

const petService = {
  getAll: async () => {
    try {
      let response = await API.get(PET_ENDPOINT.LIST_PET);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  get: async (id) => {
    try {
      let response = await API.get(PET_ENDPOINT.PET_DATA + id);
      return response.data;
    } catch (error) {
      return error;
    }
  },
  post: async (data) => {
    try {
      let response = await API.post(PET_ENDPOINT.CREATE_PET, data);
      return response.data;
    } catch (error) {
      return error;
    }
  },
  delete: async (id) => {
    try {
      let response = await API.delete(PET_ENDPOINT.PET_DATA + id);

      return response.data;
    } catch (error) {
      return error;
    }
  },

  update: async (data) => {
    try {
      let response = await API.put(PET_ENDPOINT.LOGIN, data);

      return response.data;
    } catch (error) {
      return error;
    }
  },
};

export default petService;
