import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function SidebarFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectedCategory = searchParams.get('category') || 'all';

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('category')
          .eq('is_active', true)
          .not('category', 'is', null)
          .order('category');

        if (error) {
          throw error;
        }

        const uniqueCategories = [
          ...new Set(
            data
              .map((item) => item.category)
              .filter(Boolean)
          ),
        ];

        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Failed to load categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const formatCategoryName = (category) => {
    return category
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (letter) => letter.toUpperCase())
      .replace(/\bMens\b/g, "Men's")
      .replace(/\bWomens\b/g, "Women's");
  };

  const handleCategoryChange = (category) => {
    const newParams = new URLSearchParams(searchParams);

    if (category === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', category);
    }

    setSearchParams(newParams);
  };

  const clearCategory = () => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('category');

    setSearchParams(newParams);
  };

  return (
    <div className="space-y-6 text-sm">

      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-slate-900">
            Categories
          </h3>

          <button
            type="button"
            onClick={clearCategory}
            className="text-xs text-blue-600 hover:underline"
          >
            Clear
          </button>
        </div>

        <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1">

          {/* All Categories */}
          <label
            className={`flex items-center p-2 rounded cursor-pointer transition-colors ${
              selectedCategory === 'all'
                ? 'bg-sky-50 text-blue-600 font-medium'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center space-x-2">

              <input
                type="radio"
                name="category"
                checked={selectedCategory === 'all'}
                onChange={() => handleCategoryChange('all')}
                className="text-blue-600 focus:ring-blue-500"
              />

              <span>All Categories</span>

            </div>
          </label>

          {/* Loading */}
          {loading && (
            <p className="p-2 text-xs text-slate-400">
              Loading categories...
            </p>
          )}

          {/* Store Categories */}
          {!loading &&
            categories.map((category) => {
              const isActive = selectedCategory === category;

              return (
                <label
                  key={category}
                  className={`flex items-center p-2 rounded cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-sky-50 text-blue-600 font-medium'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center space-x-2">

                    <input
                      type="radio"
                      name="category"
                      checked={isActive}
                      onChange={() =>
                        handleCategoryChange(category)
                      }
                      className="text-blue-600 focus:ring-blue-500"
                    />

                    <span>
                      {formatCategoryName(category)}
                    </span>

                  </div>
                </label>
              );
            })}

          {/* No Categories */}
          {!loading && categories.length === 0 && (
            <p className="p-2 text-xs text-slate-400">
              No categories available.
            </p>
          )}

        </div>
      </div>

    </div>
  );
}