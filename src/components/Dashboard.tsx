import { useEffect, useState, useCallback } from "react";
import Grid from "@mui/material/Grid";
import { Box, Button, Typography, Alert, AlertTitle } from "@mui/material";
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
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<ResponseFromProducts>();
  const [selectedProductNames, setSelectedProductNames] = useState<string[]>(
    []
  );
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [showProductsPie, setShowProductsPie] = useState(false);
  const [isReportButtonDisabled, setIsReportButtonDisabled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        setError("Error fetching categories");
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedCategory) return;
      try {
        const data = await getProductsByCategory(selectedCategory);
        setProducts(data);
      } catch (error) {
        setError("Error fetching products");
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
    setShowProductsPie(false);
    setIsReportButtonDisabled(false);
    setError(null);
  }, []);

  const handleProductsSelect = useCallback((productNames: string[]) => {
    setSelectedProductNames(productNames);
    setIsReportButtonDisabled(false);
  }, []);

  const handleFilterClear = () => {
    setSelectedCategory("");
    setShowProductsPie(false);
    setIsReportButtonDisabled(false);
    setError(null);
  };

  const handleReportGeneration = () => {
    const selected = findSelectProducts(products, selectedProductNames);
    setSelectedProducts(selected);
    setShowProductsPie(true);
    setIsReportButtonDisabled(true);
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
              categoryList={categories}
              selectCategory={selectedCategory}
            />
            <MultiSelect
              isCategorySelected={!!selectedCategory}
              products={products}
              setSelectedProductfunc={handleProductsSelect}
              category={selectedCategory}
            />
            <Button
              variant="contained"
              disabled={!selectedCategory || isReportButtonDisabled}
              onClick={handleReportGeneration}
            >
              Run Report
            </Button>
          </Box>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} sm={8} sx={{ marginTop: "10px" }}>
          {error ? (
            <Alert severity="error" onClose={() => setError(null)}>
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          ) : (
            <>
              {!selectedCategory && <AllCategoriesPieChart />}
              {selectedCategory && !showProductsPie && (
                <SelectedCategoryPieChart
                  pieData={products}
                  title={selectedCategory}
                />
              )}
              {showProductsPie && (
                <BarChart
                  products={
                    selectedProducts.length
                      ? selectedProducts
                      : products?.products
                  }
                  title={selectedCategory}
                />
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
