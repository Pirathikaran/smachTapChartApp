import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getCategories } from "../api/categories";
import { Box, CircularProgress } from "@mui/material";
import { Category } from "../types/Categories";
import { getRandomColor } from "../utils/generateRandomColor";

const AllCategoriesPieChart = () => {
  const [categories, setCategories] = useState<Category[]>();
  const categoryCount = categories?.length;
  let yValue = 0;
  if (categoryCount) {
    yValue = 360 / categoryCount;
  }

  const highchartData = categories?.map((category) => {
    return {
      name: category.name,
      y: yValue,
      color: getRandomColor(),
    };
  });
  const option = {
    chart: {
      type: "pie",
    },
    title: {
      text: "All Categories",
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        data: highchartData,
      },
    ],
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  if (!categories) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress size={40} />
      </Box>
    );
  }
  return (
    <Box>
      <HighchartsReact highcharts={Highcharts} options={option} />
    </Box>
  );
};

export default AllCategoriesPieChart;
