import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

const commentService = {
  getInterviewComments: async (params: {
    interviewId: string;
    offset: number;
    limit: number;
  }) => {
    try {
      const response = await axios.get(`${BASE_URL}/comment`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  },
  createComment: async (body: { interviewId: string; comment: string }) => {
    try {
      const response = await axios.post(`${BASE_URL}/comment`, body);
      return response.data;
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  },
};

export default commentService;
