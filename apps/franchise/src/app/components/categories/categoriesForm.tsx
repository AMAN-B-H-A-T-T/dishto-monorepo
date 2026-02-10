import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import { Icon, InputField } from '@lib/ui';
import { useAuth } from '../../contexts/AuthContext';
import { useApi } from '../../contexts/ApiContext';

// Interface for category form data
interface CategoryFormData {
  name: string;
  description: string;
  is_active?: boolean;
}

const CategoriesForm: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const isEditMode = !!slug;
  const { outletSlug, loading, setLoading } = useAuth();
  const { api } = useApi();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CategoryFormData>({
    defaultValues: {
      is_active: true,
    },
  });

  const isActive = watch('is_active');

  // Fetch category data if in edit mode
  useEffect(() => {
    const fetchCategoryData = async () => {
      if (isEditMode && outletSlug?.slug) {
        try {
          setLoading(true);
          const res = await api.get(
            `/api/protected/menu/${outletSlug.slug}/categories?slug=${slug}`,
            { withCredentials: true }
          );

          if (res.data.status === 'SUCCESS' && res.data.data.categories?.[0]) {
            const category = res.data.data.categories[0];
            setValue('name', category.name);
            setValue('description', category.description);
            setValue('is_active', category.is_active);
          }
        } catch (error) {
          console.error('Error fetching category:', error);
          toast.error('Failed to load category data');
          navigate('/categories/list');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCategoryData();
  }, [isEditMode, slug, outletSlug?.slug, setValue, setLoading, navigate]);

  // Handle form submission
  const onSubmit: SubmitHandler<CategoryFormData> = async (data) => {
    if (!outletSlug?.slug) {
      toast.error('No outlet selected');
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: data.name,
        description: data.description,
        is_active: data.is_active,
      };

      const url = isEditMode
        ? `/api/protected/menu/${outletSlug.slug}/categories/${slug}`
        : `/api/protected/menu/${outletSlug.slug}/categories`;

      const method = isEditMode ? 'put' : 'post';

      const res = await api[method](url, payload, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.data.status === 'SUCCESS') {
        toast.success(
          isEditMode
            ? 'Category updated successfully!'
            : 'Category created successfully!'
        );

        // Navigate to the category detail page
        const categorySlug =
          res.data.data?.slug ||
          res.data.data?.category?.slug ||
          res.data.data?.categories?.[0]?.slug ||
          slug;

        if (categorySlug) {
          navigate(`/categories/${categorySlug}`);
        } else {
          navigate('/categories/list');
        }
      }
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error(
        isEditMode ? 'Failed to update category' : 'Failed to create category'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/categories/list')}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
        >
          <Icon name="ArrowLeft" size={16} />
          <span>Back to categories</span>
        </button>
        <h1 className="text-xl font-semibold text-gray-900">
          {isEditMode ? 'Edit Category' : 'New Category'}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {isEditMode
            ? 'Update the category name, description, or visibility.'
            : 'Add a new category to organize your menu items.'}
        </p>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white border border-gray-200 rounded-xl">
          {/* Name Field */}
          <div className="p-5 border-b border-gray-100">
            <InputField
              {...register('name', {
                required: 'Please enter a category name',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
              id="category-name"
              name="name"
              type="text"
              label="Category Name *"
              placeholder="e.g. Starters, Main Course, Beverages"
              error={errors.name?.message}
              labelClassName="text-gray-700"
              className={`rounded-lg bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:ring-2 focus:ring-offset-1 ${
                errors.name
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                  : 'focus:border-orange focus:ring-orange/20'
              }`}
            />
          </div>

          {/* Description Field */}
          <div className="p-5 border-b border-gray-100">
            <label
              htmlFor="category-desc"
              className="block mb-1.5 text-sm font-medium text-gray-700"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="category-desc"
              placeholder="Briefly describe what this category includes"
              rows={3}
              {...register('description', {
                required: 'Please enter a description',
                minLength: {
                  value: 10,
                  message: 'Description must be at least 10 characters',
                },
              })}
              className={`w-full resize-none rounded-lg border bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:ring-2 focus:ring-offset-1 ${
                errors.description
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                  : 'border-gray-300 focus:border-orange focus:ring-orange/20'
              }`}
            />
            {errors.description && (
              <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                <Icon name="AlertCircle" size={12} />
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Visibility Toggle */}
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <Icon name={isActive ? 'Eye' : 'EyeOff'} size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Visible to customers
                  </p>
                  <p className="text-xs text-gray-500">
                    {isActive
                      ? 'This category is shown on the menu'
                      : 'This category is hidden from the menu'}
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register('is_active')}
                  className="sr-only peer"
                />
                <div className="w-10 h-5.5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange/20 rounded-full peer peer-checked:after:translate-x-4.5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4.5 after:w-4.5 after:shadow-sm after:transition-all peer-checked:bg-orange" />
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 mt-5">
          <button
            type="button"
            onClick={() => navigate('/categories/list')}
            className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-orange rounded-lg transition-colors hover:bg-orange/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Icon name="Loader2" size={16} className="animate-spin" />
            ) : (
              <Icon name="Check" size={16} />
            )}
            {isEditMode ? 'Save Changes' : 'Create Category'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoriesForm;
