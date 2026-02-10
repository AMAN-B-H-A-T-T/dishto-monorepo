import { useEffect, useState } from 'react';

import { DndContext, type DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { SortableItem } from '@lib/ui';
import { useAuth } from '../../contexts/AuthContext';

const CategoriesDetail = () => {
  const { slug } = useParams();
  const { outletSlug, setLoading, loading } = useAuth();
  const [sortLoading, setSortLoading] = useState(false);
  const [userMenuItems, setUserMenuItems] = useState([]);
  const getMenuItems = async () => {
    try {
      setLoading(true);
      //   setError(null);
      // console.log("Called");
      const res = await axios.get(
        // getApiUrl(
        //   `/api/protected/restaurant/420a35a2a102426f_1749822804014/items?category_slug=${slug}&slug=__all__`
        // ),

        `/api/protected/restaurant/${outletSlug?.slug}/items?category_slug=${slug}&slug=__all__`,
        {
          withCredentials: true,
        }
      );

      // console.log({ res });

      // Set the menu items directly from API
      setUserMenuItems(res?.data?.data?.items);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      //   setError("Failed to load menu items");
      // Fallback to empty array on error
      //   setMenuItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (outletSlug?.slug) {
      getMenuItems();
    }
  }, [slug, outletSlug?.slug]);

  // console.log({ userMenuItems });

  if (loading) return <h1>loading....</h1>;
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = userMenuItems.findIndex(
      (item: any) => item?.slug === active.id
    );
    const newIndex = userMenuItems.findIndex(
      (item: any) => item?.slug === over.id
    );

    const newSorted = arrayMove(userMenuItems, oldIndex, newIndex);
    setUserMenuItems(newSorted);

    try {
      setSortLoading(true);
      await axios.post(
        `/api/protected/restaurant/${outletSlug?.slug}/items/${slug}/rearrange_display_order`,
        {
          ordering: newSorted.map((item: any, index) => ({
            menu_item_slug: item?.slug,
            display_order: index + 1,
          })),
        },
        { withCredentials: true }
      );
      //   toast.success("Order updated successfully");
    } catch (error) {
      console.error('Error updating order:', error);
      //   toast.error("Failed to update order");
      getMenuItems(); // Re-fetch to restore original order
    } finally {
      setSortLoading(false);
    }
  };
  return (
    <div className="relative">
      <h1 className="mb-4 text-xl font-bold">Category: {slug}</h1>

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
          items={userMenuItems.map((item: any) => item?.slug)}
          strategy={verticalListSortingStrategy}
        >
          {userMenuItems.map((item: any) => (
            <SortableItem key={item?.slug} id={item?.slug}>
              <div className="flex items-center gap-4 transition-all">
                <div>
                  <img
                    src={`https://dev.dishto.in${item?.image}`} // Replace with actual image field
                    alt={item?.name}
                    className="object-cover w-24 h-24 rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item?.name}
                  </h3>
                  <span className="text-sm font-semibold text-[#E67E22]">
                    ₹{Number(item?.price).toFixed(2)}
                  </span>
                  {/* Optional: Add description or price */}
                  {/* <p className="text-sm text-gray-500">{item.description}</p> */}
                </div>
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default CategoriesDetail;
