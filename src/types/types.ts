// DatasetRow type: Represents each row in the dataset
export interface DatasetRow {
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": string | number;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": string | number;
}

// TableData type: Represents the processed data for the table
export interface TableData {
  year: string;
  maxCrop: string;
  minCrop: string;
}

// ChartData type: Represents the processed data for the chart
export interface ChartData {
  name: string;
  averageYield: number;
}
