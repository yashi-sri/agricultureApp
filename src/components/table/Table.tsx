import React, { useState } from "react";
import "../../styles/Table.css";
import { Table } from "@mantine/core";

// Import types
import { TableData } from "./types/types";

const TableComponent: React.FC<TableData> = ({ data }) => {
  const rowsPerPage = 10; // Number of rows per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Get rows for the current page
  const currentData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle pagination
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const rows = currentData.map((element, index) => (
    <Table.Tr key={index}>
      <Table.Td>{element.year}</Table.Td>
      <Table.Td>{element.maxCrop}</Table.Td>
      <Table.Td>{element.minCrop}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="table-container">
      {/* <table className="custom-table">
        <thead>
          <tr>
            <th>Year</th>
            <th>Crop with Maximum Production</th>
            <th>Crop with Minimum Production</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr key={index}>
              <td>{row.year}</td>
              <td>{row.maxCrop}</td>
              <td>{row.minCrop}</td>
            </tr>
          ))}
        </tbody>
      </table> */}

      {/* <Table.ScrollContainer minWidth={800} className="custom-table"> */}
      <Table className="custom-table">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Element year</Table.Th>
            <Table.Th>maxProduction</Table.Th>
            <Table.Th>minProduction</Table.Th>
            {/* <Table.Th>Atomic mass</Table.Th> */}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      {/* </Table.ScrollContainer> */}

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
