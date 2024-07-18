import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ResponseFromProducts } from "../types/Products";
import { Box, CircularProgress } from "@mui/material";

type Props = {
  title: string;
  pieData: ResponseFromProducts | undefined;
};

const SelectedCategoryPieChart: React.FC<Props> = ({ title, pieData }) => {
  const categoryCount = pieData?.products.length;
  let yValue = 0;
  if (categoryCount) {
    yValue = 360 / categoryCount;
  }
  // Function to generate random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const highchartData = pieData?.products.map((category) => {
    return {
      name: category.title,
      y: yValue,
      color: getRandomColor(),
    };
  });
  const option = {
    chart: {
      type: "pie",
    },
    title: {
      text: `${title} Category`,
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

  if (!pieData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress size={40} />
      </Box>
    );
  }
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={option} />
    </div>
  );
};

export default React.memo(SelectedCategoryPieChart);
