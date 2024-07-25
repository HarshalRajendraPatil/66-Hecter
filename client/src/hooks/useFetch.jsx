import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setStatus("loading");
    try {
      setLoading(true);
      const response = await axios.get(endpoint);
      setData(() => response.data.data);
      setStatus("succeeded");
      setLoading(false);
    } catch (error) {
      setStatus("failed");
      setError(error.message);
      toast.error("Failed to load the data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, status };
};

export default useFetch;
