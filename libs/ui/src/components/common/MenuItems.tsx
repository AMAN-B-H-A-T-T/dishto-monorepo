import React from 'react';

// Define the API response type for menu items
interface MenuItemAPI {
  id: number;
  name: string;
  description: string;
  price: string | number;
  category: {
    id: string;
    name: string;
    slug?: string;
  };
  image?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

interface MenuItemsProps {
  menuItems: MenuItemAPI[];
}

export const MenuItems: React.FC<MenuItemsProps> = ({ menuItems }) => {
  const SliderItems = menuItems.map((item) => {
    return (
      <li
        key={item?.id}
        className="min-w-[280px] flex-shrink-0 rounded-[12px] border border-[#E6E6E6] bg-white p-4"
      >
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <img
              src={item?.image || '/food.png'}
              alt="item"
              className="object-cover w-12 h-12 rounded-md"
            />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="mb-1 text-base font-semibold line-clamp-1">
              {item?.name}
            </span>
            <span className="text-sm text-[#00000099]">
              {item?.category?.name || 'Unknown Category'}
            </span>
          </div>
        </div>
      </li>
    );
  });
  return (
    <div className="mb-5">
      <div>
        <button className="flex justify-end w-full mb-4 cursor-pointer">
          View All
        </button>
      </div>
      <ul className="flex w-[100vw] gap-5 overflow-x-scroll">{SliderItems}</ul>
    </div>
  );
};

export default MenuItems;
