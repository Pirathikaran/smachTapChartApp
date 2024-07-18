export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface CategorySelectProps {
  setSelectCategoryfunc: (category: string) => void;
  categoryList: Category[];
  selectCategory: string;
}
