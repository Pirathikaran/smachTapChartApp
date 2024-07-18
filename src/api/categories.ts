import fetchData from "./fetchData";
import { ResponseFromProducts } from "../types/Products";

interface Category {
  slug: string;
  name: string;
  url: string;
}

export const getCategories = async (): Promise<Category[]> => {
  return await fetchData<Category[]>("/products/categories");
};

export const getProductsByCategory = async (
  slug: string
): Promise<ResponseFromProducts> => {
  return await fetchData<ResponseFromProducts>(`/products/category/${slug}`);
};
