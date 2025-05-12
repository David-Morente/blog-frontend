import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { getPostById } from "../services/api";

export const useGetPost = () => {
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPost = useCallback(async (id) => {
    console.log("Fetching post with ID:", id);
    setIsLoading(true);
    try {
      const response = await getPostById(id);
      if (response.error) {
        const err = response.e;
        const msg = err.response?.data?.msg || err.message;
        toast.error(msg);
        return;
      }
      setPost(response.data.post);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { post, fetchPost, isLoading };
};