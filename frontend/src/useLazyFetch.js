import { useState, useCallback } from 'react';

export function useLazyFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refetch = useCallback(async (overrideUrl, overrideOptions) => {
    const requestUrl = overrideUrl || url;
    const requestOptions = overrideOptions || options;

    if (!requestUrl) {
      setError('No URL provided');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(requestUrl, requestOptions);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  return { data, loading, error, refetch };
}
