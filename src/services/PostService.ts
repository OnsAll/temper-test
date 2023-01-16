import type { Post } from "@/types/Post";
import axios from "axios";

export default {
  async getPosts(count = 5): Promise<Post[] | null> {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.data) {
        return null;
      }
      return response.data.splice(0, count);
    } catch (error) {
      return null;
    }
  },
};
