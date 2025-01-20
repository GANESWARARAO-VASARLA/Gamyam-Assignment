import { useState, useEffect } from "react";
import axios from "axios";

const useFetchLands = (initialPage = 1, pageSize = 10) => {
  const [lands, setLands] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);

  const fetchLands = async () => {
    try {
      const response = await axios.get(
        `https://prod-be.1acre.in/lands/?division=24&page_size=${pageSize}&page=${page}&ordering=-updated_at`
      );
      const data = response.data.results;
      if (data.length > 0) {
        setLands((prevLands) => [...prevLands, ...data]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching lands:", error);
    }
  };

  useEffect(() => {
    fetchLands();
  }, [page]);

  return { lands, hasMore, fetchLands };
};

export default useFetchLands;
