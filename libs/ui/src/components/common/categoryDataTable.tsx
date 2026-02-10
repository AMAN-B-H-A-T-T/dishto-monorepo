import React from 'react';

import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import { Icon } from './Icon';

// Define the API response type for categories
interface CategoryAPI {
  id: string;
  name: string;
  description: string;
  outlet: string;
  slug?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Create type-safe cell renderer params
interface TextCellRendererParams extends ICellRendererParams {
  value: string;
}

interface CategoryDataTableProps {
  categories: CategoryAPI[];
}

export const CategoryDataTable: React.FC<CategoryDataTableProps> = ({
  categories,
}) => {
  const colDefs: ColDef<CategoryAPI>[] = [
    {
      field: 'name',
      headerName: 'Category Name',
      cellRenderer: (params: TextCellRendererParams) => {
        return <span className="font-semibold">{params.value}</span>;
      },
      width: 300,
    },
    {
      field: 'description',
      headerName: 'Description',
      cellRenderer: (params: TextCellRendererParams) => {
        return (
          <span className="text-gray-700">
            {params.value || 'No description'}
          </span>
        );
      },
      width: 400,
    },
    {
      headerName: 'Action',
      cellRenderer: () => {
        return (
          <div className="flex justify-center">
            <button className="p-1">
              <Icon name="Ellipsis" />
            </button>
          </div>
        );
      },
      width: 100,
    },
  ];

  return (
    <div className="w-full h-screen">
      <div className="w-full h-full custom-ag-table">
        <AgGridReact<CategoryAPI>
          rowData={categories}
          columnDefs={colDefs}
          getRowClass={() => 'custom-row'}
          defaultColDef={{
            resizable: true,
            sortable: true,
            flex: 1,
          }}
          domLayout="normal"
          rowHeight={120}
          headerHeight={50}
          className="rounded-md"
        />
      </div>
    </div>
  );
};
