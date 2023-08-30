import axios from "axios";

const BASE_URL = "http://localhost:8080"; // Update with your backend URL

const commentService = {
  createComment: async (interviewId: string, body: any) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/comment/${interviewId}`,
        body
      );
      return response.data;
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  },
};

export default commentService;
