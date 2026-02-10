import React from 'react';

import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import type { AxiosInstance } from 'axios';

//todo: uncomment this letter
// import { useAuth } from '../../context/AuthContext';
// import { getApiUrl } from '../../utils/api';

import { Icon } from './Icon';
import { CustomButton } from './CustomButton';

// Define the API response type for menu items
interface MenuItemAPI {
  id: number;
  name: string;
  description: string;
  price: string | number;
  slug: string;
  category: {
    id: string;
    name: string;
    slug?: string;
  };
  image?: string;
  is_available?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Create type-safe cell renderer params
interface PhotoCellRendererParams extends ICellRendererParams {
  value: string;
}

interface TextCellRendererParams extends ICellRendererParams {
  value: string;
}

interface PriceCellRendererParams extends ICellRendererParams {
  value: number;
}

interface DataTableProps {
  menuItems: MenuItemAPI[];
  api: AxiosInstance;
  outletSlug?: { slug: string } | null;
}

export const DataTable: React.FC<DataTableProps> = ({
  menuItems,
  api,
  outletSlug,
}) => {
  const colDefs: ColDef<MenuItemAPI>[] = [
    {
      field: 'image',
      headerName: 'Photo',
      cellRenderer: (params: PhotoCellRendererParams) => {
        return (
          <div className="flex max-w-[80px] justify-center">
            <img
              src={
                params.value
                  ? `https://dev.dishto.in${params.value}`
                  : '/food.png'
              }
              // src={
              //   `${import.meta.env.VITE_API_BASE_URL}${params.value}` ||
              //   "/food.png"
              // }
              alt="Product"
              className="object-cover rounded-md"
            />
          </div>
        );
      },
      width: 100,
    },
    {
      field: 'name',
      headerName: 'Product Name',
      cellRenderer: (params: TextCellRendererParams) => {
        return <span className="font-semibold">{params.value}</span>;
      },
      width: 200,
    },
    {
      field: 'price',
      headerName: 'Price',
      cellRenderer: (params: PriceCellRendererParams) => {
        const price =
          typeof params.value === 'string'
            ? parseFloat(params.value)
            : params.value;
        return (
          <span className="font-medium text-orange-600">
            ₹{price.toFixed(2)}
          </span>
        );
      },
      width: 100,
    },
    {
      field: 'description',
      headerName: 'Description',
      cellRenderer: (params: TextCellRendererParams) => {
        return (
          <span className="text-sm text-gray-600 line-clamp-2">
            {params.value || 'No description'}
          </span>
        );
      },
      width: 200,
    },
    {
      field: 'is_available',
      headerName: 'Status',
      cellRenderer: (params: ICellRendererParams<MenuItemAPI>) => {
        const currentData: any = params.data;
        const isActive = currentData?.is_available;

        const handleClick = async () => {
          console.log({ currentData });
          const newStatus = !currentData.is_available;

          try {
            const res = await api.patch(
              `/api/protected/menu/${outletSlug?.slug}/items/${currentData?.category_slug}/${currentData?.slug}`,
              { is_available: newStatus }
            );

            console.log('Status updated:', res.data);

            // ✅ Update the grid instantly
            params.node.setDataValue('is_available', newStatus);
          } catch (e) {
            console.error('Failed to update status', e);
          }
        };

        return (
          <div className="flex justify-center">
            {isActive ? (
              <CustomButton
                label="Active"
                icon={<Icon name="Eye" height={16} width={16} />}
                bgColor="bg-green-light"
                className="border-active border !px-3 !py-[6px]"
                textColor="text-[var(--color-active)]"
                onClick={handleClick}
              />
            ) : (
              <CustomButton
                label="Inactive"
                icon={<Icon name="EyeOff" height={16} width={16} />}
                bgColor="bg-red-light"
                className="border-red border !px-3 !py-[6px]"
                textColor="text-red"
                onClick={handleClick}
              />
            )}
          </div>
        );
      },
      width: 120,
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
        <AgGridReact<MenuItemAPI>
          rowData={menuItems}
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
