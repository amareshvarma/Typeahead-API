import { useCallback, useEffect, useState } from "react";
import useDebounce from "./useDebounce";

const useFetchPromise = (
  query,
  dataPromise,
  debounceWait,
  maxItems,
  // console.log("query from useFetch", query);
  isAutoComplete
) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    useDebounce(async (query, signal) => {
      try {
        const response = await dataPromise(query, signal);
        // console.log("query from useFetch", response.results);

        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        // console.log(data);
        setData(data.results.slice(0, maxItems));
      } catch (e) {
        if (!signal.isAborted) setError(e);
      }
    }, debounceWait),
    []
  );

  useEffect(() => {
    console.log(query, isAutoComplete);
    if (!query || !isAutoComplete) {
      setData(null);
      setError(null);
      console.log("this is query", query);

      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;
    fetchData(query, signal);
    return () => {
      controller.abort();
    };
  }, [query, isAutoComplete, fetchData]);

  return [data, setData, error];
};

export default useFetchPromise;
