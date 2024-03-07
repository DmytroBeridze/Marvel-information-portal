import { useCallback, useState } from "react";

const useHttp = () => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (
      url,
      method = "GET",
      header = { "Conyent-type": "application/json" },
      body = null
    ) => {
      setLoader(true);
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
        return data;
      } catch (error) {
        // setError(error.message);
        setError(true);
        setLoader(false);
        throw error;
      }
    },
    []
  );
  const clearError = useCallback(() => setError(false), []);
  return { request, loader, error, clearError };
};
export default useHttp;
