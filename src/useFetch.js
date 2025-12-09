import { useState, useEffect, useCallback } from 'react';

export function useFetch(url, options) {
  const API = import.meta.env.VITE_API_URL ?? "";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (overrideUrl, overrideOptions) => {
    const requestUrl = overrideUrl || url;
    const requestOptions = overrideOptions || options;

    if (!requestUrl) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API + requestUrl, requestOptions);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
