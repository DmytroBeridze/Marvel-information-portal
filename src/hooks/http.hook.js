import { useCallback, useState } from "react";

const useHttp = () => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  // Finite-State Mashine
  const [process, setProcess] = useState("waiting");

  const request = useCallback(
    async (
      url,
      method = "GET",
      header = { "Content-type": "application/json" },
      body = null
    ) => {
      setLoader(true);
      setProcess("loading");
      try {
        const response = await fetch(url, {
          method,
          header,
          body,
        });
        if (!response.ok) {
          throw new Error("No fetch");
        }
        const data = await response.json();
        setLoader(false);
        // Так як фсинхронно приходять дані, setProcess
        // встановлено в Charinfo.js
        // setProcess("ready");
        return data;
      } catch (error) {
        setError(error.message);
        setLoader(false);
        setProcess("error");
        throw error;
      }
    },
    []
  );
  const clearError = useCallback(() => setError(false), []);
  return { request, loader, error, clearError, process, setProcess };
};
export default useHttp;
