import axios from "axios";

const BASE_URL = "http://localhost:8080"; // Update with your backend URL

const interviewService = {
  getManyInterview: async (options: { offset: number; limit: number }) => {
    try {
      const response = await axios.get(`${BASE_URL}/interview`, {
        params: options,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching interviews:", error);
      throw error;
    }
  },

  getInterview: async (id: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/interview/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching interview:", error);
      throw error;
    }
  },

  createInterview: async (body: { title: string; description: string }) => {
    try {
      const response = await axios.post(`${BASE_URL}/interview`, body);
      return response.data;
    } catch (error) {
      console.error("Error creating interview:", error);
      throw error;
    }
  },

  updateInterview: async (
    id: string,
    body: Partial<{ title: string; description: string; status: string }>
  ) => {
    try {
      const response = await axios.put(`${BASE_URL}/interview/${id}`, body);
      return response.data;
    } catch (error) {
      console.error("Error updating interview:", error);
      throw error;
    }
  },

  deleteInterview: async (id: string) => {
    try {
      const response = await axios.delete(`${BASE_URL}/interview/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting interview:", error);
      throw error;
    }
  },
};

export default interviewService;
