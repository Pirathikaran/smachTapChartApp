import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Box, Button, Typography } from "@mui/material";
import CategorySelect from "./CategorySelect";
import MultiSelect from "./MultiSelectProducts";
import { getCategories, getProductsByCategory } from "../api/categories";
import { Product, ResponseFromProducts } from "../types/Products";
import AllCategoriesPieChart from "./AllCategoriesPieChart";
import SelectedCategoryPieChart from "./SelectedCategoryPieChart";
import { findSelectProducts } from "../utils/findSelectedProduct";
import BarChart from "./BarChart";
import { Category } from "../types/Categories";

const Dashboard = () => {
  const [selectCategory, setSelectCategory] = useState<string>("");
  const [dropdownMenu, setDropdownMenu] = useState<Category[]>([]);
  const [products, setProducts] = useState<ResponseFromProducts>();
  const [selectedProductsName, setSelectedProductsNames] = useState<string[]>(
    []
  );
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [showColumnChart, setColumnChart] = useState(false);
  const [showProductsPie, setShowProductsPie] = useState(false);
  const [isReportBtnDisable, setIsReportBtnDisable] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setDropdownMenu(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        if (selectCategory) {
          const data = await getProductsByCategory(selectCategory);
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductsByCategory();
  }, [selectCategory]);

  const handleCategorySelect = (category: string) => {
    setSelectCategory(category);
    if (showProductsPie) {
      setShowProductsPie(false);
    }
    if (isReportBtnDisable) {
      setIsReportBtnDisable(!isReportBtnDisable);
    }
  };

  const handleProductsSelect = (productNames: string[]) => {
    setSelectedProductsNames(productNames);
    if (isReportBtnDisable) {
      setIsReportBtnDisable(!isReportBtnDisable);
    }
  };

  const handleFilterClear = () => {
    setSelectCategory("");
    setColumnChart(false);
    setShowProductsPie(false);
    setIsReportBtnDisable(false);
  };

  const handleReportGeneration = () => {
    const response = findSelectProducts(products, selectedProductsName);
    setSelectedProducts(response);
    if (!showProductsPie) {
      setShowProductsPie(!showProductsPie);
    }
    setColumnChart(!showColumnChart);
    setIsReportBtnDisable(!isReportBtnDisable);
  };

  return (
    <Box>
      <Grid
        container
        spacing={1}
        sx={{
          paddingRight: "10px",
          paddingLeft: "20px",
          minHeight: "90vh",
          height: "auto",
        }}
      >
        {/* Sidebar */}
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            background: "linear-gradient(to right, #A1C4FD, #C2E9FB)",
            marginTop: "30px",
            borderRadius: "10px",
            boxShadow:
              "11px 21px 20px -3px rgba(0,0,0,0.1),-12px -12px 15px -6px rgba(0,0,0,0.1)",
          }}
        >
          <Box
            sx={{
              padding: "20px",
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              justifyContent: "space-between",
            }}
          >
            <Typography>Filters</Typography>
            <Button variant="text" onClick={handleFilterClear}>
              Clear
            </Button>
          </Box>
          <Box
            sx={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <CategorySelect
              setSelectCategoryfunc={handleCategorySelect}
              categoryList={dropdownMenu}
              selectCategory={selectCategory}
            />
            <MultiSelect
              isCategorySelected={selectCategory.length !== 0}
              products={products}
              setSelectedProductfunc={handleProductsSelect}
              category={selectCategory}
            />
            <Button
              variant="contained"
              disabled={!selectCategory || isReportBtnDisable}
              onClick={handleReportGeneration}
            >
              Run Report
            </Button>
          </Box>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} sm={8} sx={{ marginTop: "10px" }}>
          {!selectCategory && <AllCategoriesPieChart />}
          {selectCategory && !showProductsPie && (
            <SelectedCategoryPieChart
              pieData={products}
              title={selectCategory}
            />
          )}
          {showProductsPie && (
            <BarChart
              products={
                selectedProducts.length !== 0
                  ? selectedProducts
                  : products?.products
              }
              title={selectCategory}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
