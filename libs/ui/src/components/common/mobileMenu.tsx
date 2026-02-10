import { memo, useState } from 'react';

import { CustomButton } from './CustomButton';
import { Icon } from './Icon';

// API response type
interface MenuItemAPI {
  slug: string;
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

interface MobileMenuProps {
  menuItems: MenuItemAPI[];
}

export const MobileMenu = memo(function MobileMenu({
  menuItems,
}: MobileMenuProps) {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const toggleButton = (slug: string) => {
    setActiveButton((prev) => (prev === slug ? null : slug));
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/food.png';
  };

  return (
    <ul className="flex flex-col space-y-2">
      {menuItems.map((menuItem) => {
        const price =
          typeof menuItem.price === 'string'
            ? parseFloat(menuItem.price)
            : menuItem.price;

        const isActive = menuItem.is_active !== false;

        return (
          <li
            key={menuItem.slug}
            className={`w-full rounded-md p-[10px] text-left ${
              activeButton === menuItem.slug
                ? 'bg-orange-light border border-orange-border'
                : 'border border-[#E6E6E6] bg-white'
            }`}
          >
            <div onClick={() => toggleButton(menuItem.slug)}>
              <div className="flex items-start gap-2">
                <Icon name="EllipsisVertical" height={20} width={20} />

                <div className="flex items-center max-w-14">
                  <img
                    src={
                      menuItem.image
                        ? `https://dev.dishto.in${menuItem.image}`
                        : '/food.png'
                    }
                    alt={menuItem.name}
                    className="object-cover rounded-md"
                    onError={handleImageError}
                  />
                </div>

                <div className="mx-[10px] flex grow flex-col text-left">
                  <span className="text-sm font-semibold lg:text-base">
                    {menuItem.name}
                  </span>
                  <span className="text-sm font-semibold text-orange lg:text-base">
                    ₹{price.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  {isActive ? (
                    <CustomButton
                      label="Active"
                      icon={<Icon name="Eye" height={16} width={16} />}
                      bgColor="bg-green-light"
                      className="border-active border !px-3 !py-[6px]"
                      textColor="text-active"
                    />
                  ) : (
                    <CustomButton
                      label="Inactive"
                      icon={<Icon name="EyeOff" height={16} width={16} />}
                      bgColor="bg-red-light"
                      className="border-red border !px-3 !py-[6px]"
                      textColor="text-red"
                    />
                  )}
                </div>
              </div>
            </div>

            {activeButton === menuItem.slug && (
              <div className="mt-4 text-sm">
                <ul>
                  <li className="flex mb-2">
                    <span className="basis-[30%] font-medium">Category:</span>
                    <span>{menuItem.category.name}</span>
                  </li>
                  <li className="flex mb-2">
                    <span className="basis-[30%] font-medium">
                      Description:
                    </span>
                    <span>{menuItem.description || 'No description'}</span>
                  </li>
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
});
