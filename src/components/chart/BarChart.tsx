import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

// Import types
import { ChartData } from "./types/types";

const BarChart: React.FC<ChartData> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);

      const options = {
        tooltip: {
          trigger: "axis",
          formatter: (params: any) => {
            const { name, value } = params[0];
            return `${name}: ${value.toLocaleString()} Kg/Ha`;
          },
        },
        xAxis: {
          type: "category",
          data: data.map((item) => item.name),
          axisLabel: {
            rotate: 45, // Rotate labels
            formatter: (value: string) => {
              return value.length > 8 ? `${value.slice(0, 8)}...` : value; // Truncate long names
            },
            color: "#333",
          },
          axisLine: {
            lineStyle: {
              color: "#ccc",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: (value: number) => {
              if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
              return value.toString();
            }, // Abbreviate large numbers
            color: "#333",
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "#e0e0e0",
            },
          },
        },
        grid: {
          left: "10%",
          right: "10%",
          bottom: "20%", // Add more space for rotated labels
        },
        series: [
          {
            data: data.map((item) => item.averageYield),
            type: "bar",
            itemStyle: {
              color: "#4caf50",
              borderRadius: [5, 5, 0, 0], // Rounded top corners
            },
            label: {
              show: false,
              position: "top",
              formatter: "{c}",
              color: "#333",
            },
          },
        ],
      };

      chartInstance.setOption(options);

      // Cleanup the chart instance on unmount
      return () => {
        chartInstance.dispose();
      };
    }
  }, [data]);

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
};

export default BarChart;
