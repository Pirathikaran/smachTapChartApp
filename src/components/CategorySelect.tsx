import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { CategorySelectProps } from "../types/Categories";

const CategorySelect: React.FC<CategorySelectProps> = ({
  setSelectCategoryfunc,
  categoryList,
  selectCategory,
}) => {
  const [category, setCategory] = useState<string>("");
  const handleChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
    setSelectCategoryfunc(event.target.value);
  };
  useEffect(() => {
    setCategory(selectCategory);
  }, [selectCategory]);

  return (
    <FormControl fullWidth>
      <InputLabel>Select Category</InputLabel>
      <Select value={category} onChange={handleChange}>
        {categoryList.map((option) => (
          <MenuItem key={option.slug} value={option.slug}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategorySelect;
