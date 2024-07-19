// src/api/api.ts

const BASE_URL = "https://dummyjson.com"; // Base URL for the API

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

const fetchData = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: T = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export default fetchData;
