import React from "react";
import TableComponent from "./components/table/Table";
import BarChart from "./components/chart/BarChart";
import { getMaxMinProduction, getAverageYield } from "./utils/dataParser";
import AgroAnalysisData from "./assets/fakeJson/agroAnalysis.json";

// Import types
import { DatasetRow, TableData, ChartData } from "./types/types";

const App: React.FC = () => {
  // Define the dataset with proper type
  const dataset: DatasetRow[] = AgroAnalysisData as DatasetRow[];

  // Process the data for table and chart
  const tableData: TableData[] = getMaxMinProduction(dataset);
  const chartData: ChartData[] = getAverageYield(dataset);

  return (
    <div>
      <h1>Indian Agriculture Analysis</h1>
      {/* Pass tableData and chartData with types */}
      <TableComponent data={tableData} />
      <BarChart data={chartData} />
    </div>
  );
};

export default App;
