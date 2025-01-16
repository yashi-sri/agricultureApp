// Import types
import { DatasetRow, TableData, ChartData } from "./types/types";

/**
 * Given a dataset of agro analysis data, find the maximum and minimum crop
 * production for each year.
 * @param dataset dataset to find maximum and minimum crop production from
 * @returns an array of objects with year, maxCrop, and minCrop fields
 */
export const getMaxMinProduction = (dataset: DatasetRow[]): TableData[] => {
  const yearlyData = dataset.reduce<
    Record<
      string,
      {
        max: { crop: string; production: number };
        min: { crop: string; production: number };
      }
    >
  >((acc, curr) => {
    const year = curr.Year.split(",")[1]?.trim();
    const production = Number(curr["Crop Production (UOM:t(Tonnes))"]);

    if (!year) return acc;

    if (!acc[year]) {
      acc[year] = {
        max: { crop: "", production: -Infinity },
        min: { crop: "", production: Infinity },
      };
    }

    if (production > acc[year].max.production) {
      acc[year].max = { crop: curr["Crop Name"], production };
    }

    if (production < acc[year].min.production && production > 0) {
      acc[year].min = { crop: curr["Crop Name"], production };
    }

    return acc;
  }, {});

  return Object.keys(yearlyData).map((year) => ({
    year,
    maxCrop: `${yearlyData[year].max.crop} (${yearlyData[year].max.production})`,
    minCrop: `${yearlyData[year].min.crop} (${yearlyData[year].min.production})`,
  }));
};

/**
 * Calculate the average yield for each crop in the dataset.
 * @param dataset dataset to find average yield from
 * @returns an array of objects with name and averageYield fields
 */
export const getAverageYield = (dataset: DatasetRow[]): ChartData[] => {
  const cropData = dataset.reduce<
    Record<string, { totalYield: number; count: number }>
  >((acc, curr) => {
    const yieldValue = Number(
      curr["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]
    );
    if (!yieldValue) return acc;

    const cropName = curr["Crop Name"];

    if (!acc[cropName]) {
      acc[cropName] = { totalYield: 0, count: 0 };
    }

    acc[cropName].totalYield += yieldValue;
    acc[cropName].count += 1;

    return acc;
  }, {});

  return Object.keys(cropData).map((crop) => ({
    name: crop,
    averageYield: cropData[crop].totalYield / cropData[crop].count,
  }));
};
