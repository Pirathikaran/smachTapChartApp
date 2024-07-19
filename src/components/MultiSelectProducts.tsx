import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import { ResponseFromProducts } from "../types/Products";

interface PropsType {
  setSelectedProductfunc: (selectedOptions: string[]) => void;
  isCategorySelected: boolean;
  products: ResponseFromProducts | undefined;
  category: string;
}

const MultiSelect: React.FC<PropsType> = ({
  setSelectedProductfunc,
  isCategorySelected,
  products,
  category,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedOptions(event.target.value as string[]);
    setSelectedProductfunc(event.target.value as string[]);
  };

  useEffect(() => {
    setSelectedOptions([]);
  }, [category]);

  return (
    <>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="multi-select-label">Select Products</InputLabel>
        <Select
          labelId="multi-select-label"
          id="multi-select"
          multiple
          value={selectedOptions}
          onChange={handleChange}
          disabled={!isCategorySelected}
          input={<OutlinedInput label="Select Options" />}
          renderValue={(selected) => (selected as string[]).join(", ")}
        >
          {products?.products?.map((option) => (
            <MenuItem key={option.title} value={option.title}>
              <Checkbox checked={selectedOptions.indexOf(option.title) > -1} />
              <ListItemText primary={option.title} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default MultiSelect;
