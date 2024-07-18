import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Product } from "../types/Products";
import { Box, CircularProgress } from "@mui/material";

type Props = {
  title: string;
  products: Product[] | undefined;
};

const BarChart: React.FC<Props> = React.memo(({ title, products }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [products]);

  const highchartData = products?.map((product) => ({
    name: product.title,
    y: product.price,
  }));

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: `${title} Category`,
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      type: "category",
      title: {
        text: "Products",
      },
    },
    yAxis: {
      title: {
        text: "Price",
      },
    },
    series: [
      {
        name: "Price",
        data: highchartData,
      },
    ],
  };

  if (isLoading || !products) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress size={80} />
      </Box>
    );
  }

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
});

export default BarChart;
