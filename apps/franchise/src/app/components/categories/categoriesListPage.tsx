import React, { useEffect, useMemo, useState } from 'react';

import {
  DndContext,
  DragOverlay,
  closestCenter,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import { Icon, SortableItem } from '@lib/ui';
import { useAuth } from '../../contexts/AuthContext';
import { useApi } from '../../contexts/ApiContext';

const CategoriesListPage: React.FC = () => {
  const { outletSlug } = useAuth();
  const { api } = useApi();
  const [sortLoading, setSortLoading] = useState(false);
  const navigate = useNavigate();
  // const [sortedCategories, setSortedCategories] = useState(categories || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);

  // useEffect(() => {
  //   setSortedCategories(categories || []);
  // }, [categories]);

  // const filteredCategories = useMemo(() => {
  //   const categoriesToFilter = sortedCategories || [];
  //   if (!searchTerm.trim()) return categoriesToFilter;

  //   const lowerSearch = searchTerm.toLowerCase();
  //   return categoriesToFilter.filter(
  //     (cat) =>
  //       (cat.name?.toLowerCase().includes(lowerSearch) ?? false) ||
  //       (cat.description?.toLowerCase().includes(lowerSearch) ?? false)
  //   );
  // }, [sortedCategories, searchTerm]);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  // const handleDragEnd = async (event: any) => {
  //   const { active, over } = event;
  //   setActiveId(null);

  //   if (over && active.id !== over.id) {
  //     const oldIndex = sortedCategories.findIndex(
  //       (cat) => cat.slug === active.id
  //     );
  //     const newIndex = sortedCategories.findIndex(
  //       (cat) => cat.slug === over.id
  //     );

  //     const newSortedCategories = arrayMove(
  //       sortedCategories,
  //       oldIndex,
  //       newIndex
  //     );

  //     setSortedCategories(newSortedCategories);

  //     try {
  //       setSortLoading(true);
  //       await axios.post(
  //         getApiUrl(
  //           `/api/protected/restaurant/${outletSlug?.slug}/categories/rearrange_display_order`
  //         ),
  //         {
  //           ordering: newSortedCategories.map((cat, index) => ({
  //             category_slug: cat.slug,
  //             display_order: index + 1,
  //           })),
  //         },
  //         { withCredentials: true }
  //       );
  //       toast.success('Order updated successfully');
  //     } catch (error) {
  //       console.error('Error updating order:', error);
  //       toast.error('Failed to update order');
  //       setSortedCategories(categories);
  //     } finally {
  //       setSortLoading(false);
  //     }
  //   }
  // };

  // const activeCategory = useMemo(
  //   () => (sortedCategories || []).find((cat) => cat.slug === activeId),
  //   [sortedCategories, activeId]
  // );

  // if (!categories || categories.length === 0) {
  //   return (
  //     <div className="flex min-h-[600px] items-center justify-center p-4">
  //       <div className="relative w-full max-w-lg overflow-hidden rounded-[32px] bg-white p-12 text-center shadow-2xl">
  //         <div className="absolute top-0 left-0 w-full h-2 from-orange to-orange/50 bg-gradient-to-r"></div>
  //         <div className="flex justify-center mb-8">
  //           <div className="relative">
  //             <div className="absolute inset-0 rounded-full bg-orange/20 animate-ping"></div>
  //             <div className="relative flex items-center justify-center w-24 h-24 rounded-full shadow-inner bg-orange/10 text-orange">
  //               <Icon name="Layers" size={48} />
  //             </div>
  //           </div>
  //         </div>

  //         <h2 className="mb-4 text-3xl font-black tracking-tight text-gray-900">
  //           Vault is Empty
  //         </h2>
  //         <p className="mb-10 text-lg leading-relaxed text-gray-500">
  //           Your culinary categories are the foundation of your menu. Start
  //           building your legacy today.
  //         </p>

  //         <button
  //           onClick={() => navigate('/categories/add')}
  //           className="group hover:bg-orange relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[#121212] px-8 py-4 font-bold text-white transition-all hover:shadow-xl active:scale-95"
  //         >
  //           <Icon
  //             name="Plus"
  //             size={20}
  //             className="transition-transform group-hover:rotate-90"
  //           />
  //           <span>Create First Category</span>
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>category list</>
    // <div className="max-w-5xl px-4 pb-20 mx-auto">
    //   {/* Premium Header */}
    //   <div className="flex flex-col justify-between gap-8 pt-6 mb-12 md:flex-row md:items-end">
    //     <div className="space-y-4">
    //       <div className="flex items-center justify-center w-16 h-16 shadow-inner bg-orange/10 text-orange rounded-2xl">
    //         <Icon name="Shapes" size={32} />
    //       </div>
    //       <div>
    //         <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
    //           Category Vault
    //         </h1>
    //         <p className="max-w-md mt-2 text-lg text-gray-500 text-balance">
    //           Organize your masterpieces into distinct collections for an
    //           effortless dining experience.
    //         </p>
    //       </div>
    //     </div>

    //     <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
    //       <div className="relative group">
    //         <div className="absolute text-gray-300 transition-colors -translate-y-1/2 group-focus-within:text-orange top-1/2 left-4">
    //           <Icon name="Search" size={20} />
    //         </div>
    //         <input
    //           type="text"
    //           value={searchTerm}
    //           onChange={(e) => setSearchTerm(e.target.value)}
    //           placeholder="Filter collections..."
    //           className="w-full pl-12 pr-4 text-sm font-medium transition-all border border-white shadow-sm outline-none focus:border-orange focus:ring-orange/10 h-14 rounded-2xl bg-white/80 backdrop-blur-xl focus:ring-4 sm:w-64 lg:w-80"
    //         />
    //       </div>

    //       <button
    //         onClick={() => navigate('/categories/add')}
    //         className="hover:bg-orange hover:shadow-orange/20 flex h-14 items-center justify-center gap-3 rounded-2xl bg-[#121212] px-8 font-bold text-white shadow-xl transition-all active:scale-95"
    //       >
    //         <Icon name="Plus" size={20} />
    //         <span className="whitespace-nowrap">New Category</span>
    //       </button>
    //     </div>
    //   </div>

    //   {/* Sorting State Indicator */}
    //   {sortLoading && (
    //     <div className="fixed z-50 flex items-center gap-3 px-6 py-4 text-white bg-black shadow-2xl animate-in fade-in slide-in-from-bottom-4 right-8 bottom-8 rounded-2xl">
    //       <Icon name="Loader2" size={20} className="text-orange animate-spin" />
    //       <span className="font-bold tracking-wide">Securing New Order...</span>
    //     </div>
    //   )}

    //   {/* Category Grid/List */}
    //   <div className="relative">
    //     <DndContext
    //       collisionDetection={closestCenter}
    //       onDragStart={handleDragStart}
    //       // onDragEnd={handleDragEnd}
    //     >
    //       <SortableContext
    //         items={(sortedCategories || []).map((item) => item.slug!)}
    //         strategy={verticalListSortingStrategy}
    //       >
    //         <div className="grid grid-cols-1 gap-4">
    //           {filteredCategories.map((item) => (
    //             <SortableItem
    //               key={item.slug}
    //               id={item.slug!}
    //               className="touch-none"
    //             >
    //               <div className="group hover:shadow-orange/5 relative flex items-center gap-6 rounded-[24px] border border-white bg-white/60 p-5 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl active:scale-[0.99]">
    //                 {/* Reorder Handle */}
    //                 <div className="flex flex-col items-center justify-center text-gray-300 transition-colors group-hover:text-orange cursor-grab">
    //                   <Icon name="GripVertical" size={24} />
    //                 </div>

    //                 {/* Image Thumbnail */}
    //                 {/* <div className="relative flex-shrink-0 w-16 h-16 overflow-hidden bg-gray-100 shadow-inner rounded-2xl">
    //                   {item.image ? (
    //                     <img
    //                       src={getApiUrl(item.image)}
    //                       alt={item.name}
    //                       className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
    //                     />
    //                   ) : (
    //                     <div className="flex items-center justify-center w-full h-full text-gray-400 bg-gradient-to-br from-gray-50 to-gray-100">
    //                       <Icon name="Image" size={24} />
    //                     </div>
    //                   )}
    //                 </div> */}

    //                 {/* Content */}
    //                 <Link
    //                   to={`${item.slug}`}
    //                   className="flex-grow min-w-0 cursor-pointer"
    //                 >
    //                   <div className="flex items-center gap-3 mb-1">
    //                     <h3 className="text-xl font-bold tracking-tight text-gray-900 truncate transition-colors group-hover:text-orange">
    //                       {item.name}
    //                     </h3>
    //                     {item.is_active ? (
    //                       <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-600 ring-1 ring-emerald-600/10 ring-inset">
    //                         Active
    //                       </span>
    //                     ) : (
    //                       <span className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-0.5 text-xs font-bold text-gray-400 ring-1 ring-gray-400/10 ring-inset">
    //                         Hidden
    //                       </span>
    //                     )}
    //                   </div>
    //                   <p className="text-sm font-medium text-gray-500 truncate">
    //                     {item.description || 'No description provided.'}
    //                   </p>
    //                 </Link>

    //                 {/* Actions */}
    //                 <div className="flex items-center gap-2 transition-all translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
    //                   <button
    //                     onClick={(e) => {
    //                       e.preventDefault();
    //                       e.stopPropagation();
    //                       navigate(`/categories/edit/${item.slug}`);
    //                     }}
    //                     className="flex items-center justify-center w-12 h-12 text-gray-600 transition-all shadow-sm hover:bg-orange hover:shadow-orange/20 rounded-xl bg-gray-50 hover:text-white"
    //                   >
    //                     <Icon name="Edit3" size={18} />
    //                   </button>
    //                 </div>
    //               </div>
    //             </SortableItem>
    //           ))}
    //         </div>
    //       </SortableContext>

    //       {/* Drag Overlay for Premium Drag Experience */}
    //       <DragOverlay
    //         dropAnimation={{
    //           duration: 300,
    //           easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
    //           sideEffects: defaultDropAnimationSideEffects({
    //             styles: {
    //               active: {
    //                 opacity: '0.4',
    //               },
    //             },
    //           }),
    //         }}
    //       >
    //         {/* {activeId && activeCategory ? (
    //           <div className="border-orange/20 ring-orange/5 flex scale-[1.05] items-center gap-6 rounded-[24px] border bg-white p-5 shadow-2xl ring-4 backdrop-blur-xl">
    //             <div className="text-orange">
    //               <Icon name="GripVertical" size={24} />
    //             </div>
    //             <div className="w-16 h-16 overflow-hidden bg-gray-100 shadow-inner rounded-2xl">
    //               {activeCategory.image ? (
    //                 <img
    //                   src={getApiUrl(activeCategory.image)}
    //                   alt="sdsdsdsdd"
    //                   className="object-cover w-full h-full"
    //                 />
    //               ) : (
    //                 <div className="flex items-center justify-center w-full h-full text-gray-400">
    //                   <Icon name="Image" size={24} />
    //                 </div>
    //               )}
    //             </div>
    //             <div>
    //               <h3 className="text-xl font-bold tracking-tight text-gray-900">
    //                 {activeCategory.name}
    //               </h3>
    //               <p className="text-sm font-medium text-orange">
    //                 Moving Category...
    //               </p>
    //             </div>
    //           </div>
    //         ) : null} */}
    //       </DragOverlay>
    //     </DndContext>
    //   </div>
    // </div>
  );
};

export default CategoriesListPage;
