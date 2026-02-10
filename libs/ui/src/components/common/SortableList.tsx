// SortableList.tsx
import { useEffect, useState } from 'react';

import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

// import { useApi } from '../../context/ApiContext';
// import { useAuth } from '../../context/AuthContext';
// import { getApiUrl } from '../../utils/api';
import { SortableItem } from './SortableItem';

export function SortableList() {
  // const { categories } = useApi();
  // const { outletSlug } = useAuth();
  const [sortLoading, setSortLoading] = useState(false);
  // const [sortedCategories, setSortedCategories] = useState(categories || []);

  const [sortedCategories, setSortedCategories] = useState([]);
  // Update local state when categories change
  // useEffect(() => {
  //   setSortedCategories(categories || []);
  // }, [categories]);

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      let newDisplayOrder;

      // Update the order in state
      setSortedCategories((prevCategories) => {
        const oldIndex = prevCategories.findIndex(
          (cat: any) => cat.slug === active.id
        );
        const newIndex = prevCategories.findIndex(
          (cat: any) => cat.slug === over.id
        );
        // console.log({ newIndex });
        newDisplayOrder = newIndex + 1;
        return arrayMove(prevCategories, oldIndex, newIndex);
      });

      // console.log({ newDisplayOrder });

      // Send to API (fire and forget, or handle errors)
      // try {
      //   setSortLoading(true);
      //   await axios.post(
      //     getApiUrl(
      //       `/api/protected/restaurant/${outletSlug?.slug}/categories/rearrange_display_order`
      //     ),
      //     {
      //       ordering: [
      //         {
      //           category_slug: active.id,
      //           display_order: newDisplayOrder,
      //         },
      //       ],
      //     }
      //   );

      //   // API call successful, UI is already correct
      // } catch (error) {
      //   console.error('Error updating order:', error);
      //   // Revert to original order on error
      //   setSortedCategories(categories);
      // } finally {
      //   setSortLoading(false);
      // }
    }
  };

  // useEffect(() => {
  //   if (outletSlug?.slug) {
  //     // rearrangeCategories();
  //   }
  // }, []);

  return (
    <div className="relative">
      {/* Loading Overlay */}
      {sortLoading && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center rounded-lg bg-opacity-30"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
        >
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-2 border-b-2 rounded-full border-orange animate-spin"></div>
            <p className="text-sm text-white">Updating order...</p>
          </div>
        </div>
      )}

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={sortedCategories?.map((item: any) => item.slug)}
          strategy={verticalListSortingStrategy}
        >
          {sortedCategories?.map((item: any) => {
            // console.log({ item });
            return (
              <SortableItem key={item?.slug} id={item?.slug}>
                <div>
                  <h3>{item.name}</h3>
                  {/* <p>{item.description}</p> */}
                  {/* Or any other content */}
                </div>
              </SortableItem>
            );
          })}
        </SortableContext>
      </DndContext>
    </div>
  );
}
