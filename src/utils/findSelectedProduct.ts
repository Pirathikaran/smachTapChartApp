import { ResponseFromProducts } from "../types/Products";

export const findSelectProducts = (
  products: ResponseFromProducts | undefined,
  selectedProductsNames: string[]
) => {
  if (!products || !products.products) {
    return [];
  }

  return products.products.filter((product) =>
    selectedProductsNames.includes(product.title)
  );
};
