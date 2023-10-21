import React from "react";
import { useData } from "../context/api";

const Table = () => {
  const { data, handleDelete } = useData();

  function head() {
    if (data.length > 0) {
      const columnNames = Object.keys(data[0]);
      return (
        <thead>
          <tr className="bg-gray-800 text-white">
            {columnNames.map((columnName) => (
              <th key={columnName} className="py-2 px-4">
                {columnName}
              </th>
            ))}
            <th className="py-2 px-4">Delete</th>
          </tr>
        </thead>
      );
    }
    return null;
  }

  function renderTableData() {
    return (
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
            {Object.values(row).map((value, colIndex) => (
              <td key={colIndex} className="py-2 px-4">
                {value}
              </td>
            ))}
            <td className="py-2 px-4">
              <button
                onClick={() => handleDelete(row.id)}
                className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  return (
    <div className="my-4">
      <table className="min-w-full bg-white border border-gray-300">
        {head()}
        {renderTableData()}
      </table>
    </div>
  );
};

export default Table;
