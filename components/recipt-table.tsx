import React from 'react';
import { ReceiptData, TableData, convertJsonToTableData } from '@/lib/recipt-utils';

interface DataTableProps {
  jsonData: any[];
}

export const ReciptTable: React.FC<DataTableProps> = ({ jsonData }) => {
  const { headers, rows } = convertJsonToTableData(jsonData);

  return (
    <div className='py-6'>
        <div className="overflow-x-auto bg-white rounded-lg border border-dashed">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
            <tr>
                {headers.map((header, index) => (
                <th 
                    key={index}
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                    {header}
                </th>
                ))}
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {row.map((cell, cellIndex) => (
                    <td 
                    key={cellIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                    {cell}
                    </td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
  );
};
