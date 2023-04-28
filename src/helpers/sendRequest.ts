export const useFetch = <T = unknown>(
  url: string,
  options?: RequestInit
): Promise<any> => {
  const fetchData = async () => {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = (await response.json()) as T;

      return data;
    } catch (error) {}
  };

  return fetchData();
};
