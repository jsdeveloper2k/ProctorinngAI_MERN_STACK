import axios from 'axios';

const AuthAPI = {
  login: async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  register: async (name, email, password, role) => {
    try {
      const response = await axios.post('/api/auth/register', { name, email, password, role });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  update: async (name, email, password, role) => {
    try {
      const response = await axios.put('/api/auth/update', { name, email, password, role });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default AuthAPI;