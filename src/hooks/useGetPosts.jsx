import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { getPosts } from "../services/api";

export const useGetPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getPosts();
      if (response.error) {
        const err = response.e;
        const msg = err.response?.data?.msg || err.message;
        toast.error(msg);
        return;
      }

      setPosts(response.data.posts);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { posts, fetchPosts, isLoading };
};