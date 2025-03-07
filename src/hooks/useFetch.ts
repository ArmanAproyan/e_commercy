import { useState, useEffect } from "react"

const useFetch = <T,>(url: string): [T | null, boolean, string | null] => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const getData = async () => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          setData(data);
          setLoading(false);
        } catch (err) {
          setLoading(false);
          setError(err instanceof Error ? err.message : "Unknown Error");
        }
      };
      getData();
    }, [url]);
  
    return [data, loading, error];
  };
  
  export default useFetch;
  