import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

const commentService = {
  getInterviewComments: async (
    interviewId: string,
    options: { offset: number; limit: number }
  ) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/comment/interview/${interviewId}`,
        {
          params: options,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  },
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
