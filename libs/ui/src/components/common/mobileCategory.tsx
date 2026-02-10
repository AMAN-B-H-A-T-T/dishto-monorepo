import { memo, useState } from 'react';
import { Icon } from './Icon';

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

interface MobileCategoryProps {
  categories: CategoryAPI[];
}

export const MobileCategory = memo(function MobileCategory({
  categories,
}: MobileCategoryProps) {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const toggleButton = (buttonIndex: string) => {
    setActiveButton((prev) => (prev === buttonIndex ? null : buttonIndex));
  };

  return (
    <ul className="flex flex-col space-y-2">
      {categories.map((category) => (
        <li
          key={category.id}
          className={`w-full rounded-md p-[10px] text-left ${
            activeButton === category.id
              ? 'bg-orange-light border-orange-border border'
              : 'border border-[#E6E6E6] bg-white'
          }`}
        >
          <div onClick={() => toggleButton(category.id)}>
            <div className="flex items-start">
              <Icon name="EllipsisVertical" height={20} width={20} />

              <div className="mx-[10px] flex flex-1 flex-col text-left">
                <span className="mb-2 text-sm font-semibold lg:text-base">
                  {category.name}
                </span>
                <span className="text-sm text-gray-600">
                  {category.description || 'No description'}
                </span>
              </div>
            </div>
          </div>

          {activeButton === category.id && (
            <div className="mt-4 text-sm">
              <ul>
                <li className="flex mb-2">
                  <span className="basis-[30%] font-medium">Slug:</span>
                  <span>{category.slug || 'N/A'}</span>
                </li>
                <li className="flex mb-2">
                  <span className="basis-[30%] font-medium">Created:</span>
                  <span>
                    {category.created_at
                      ? new Date(category.created_at).toLocaleDateString()
                      : 'N/A'}
                  </span>
                </li>
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
});
