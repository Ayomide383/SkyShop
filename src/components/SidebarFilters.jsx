import React from 'react';
import { useSearchParams } from 'react-router-dom';

export default function SidebarFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category') || 'all';

  const categories = [
    { name: 'All Categories', slug: 'all' },
    { name: 'Beauty', slug: 'beauty' },
    { name: 'Fragrances', slug: 'fragrances' },
    { name: 'Furniture', slug: 'furniture' },
    { name: 'Groceries', slug: 'groceries' },
    { name: 'Home Decoration', slug: 'home-decoration' },
    { name: 'Kitchen Accessories', slug: 'kitchen-accessories' },
    { name: 'Laptops', slug: 'laptops' },
    { name: "Men's Shirts", slug: 'mens-shirts' },
    { name: "Men's Shoes", slug: 'mens-shoes' },
    { name: "Men's Watches", slug: 'mens-watches' },
    { name: 'Mobile Accessories', slug: 'mobile-accessories' },
    { name: 'Motorcycle', slug: 'motorcycle' },
    { name: 'Skin Care', slug: 'skin-care' },
    { name: 'Smartphones', slug: 'smartphones' },
    { name: 'Sports Accessories', slug: 'sports-accessories' },
    { name: 'Sunglasses', slug: 'sunglasses' },
    { name: 'Tablets', slug: 'tablets' },
    { name: 'Tops', slug: 'tops' },
    { name: 'Vehicle', slug: 'vehicle' },
    { name: "Women's Bags", slug: 'womens-bags' },
    { name: "Women's Dresses", slug: 'womens-dresses' },
    { name: "Women's Jewellery", slug: 'womens-jewellery' },
    { name: "Women's Shoes", slug: 'womens-shoes' },
    { name: "Women's Watches", slug: 'womens-watches' },
  ];

  const handleCategoryChange = (slug) => {
    const newParams = new URLSearchParams(searchParams);

    if (slug === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', slug);
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

          {categories.map((cat) => {
            const isActive = selectedCategory === cat.slug;

            return (
              <label
                key={cat.slug}
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
                    onChange={() => handleCategoryChange(cat.slug)}
                    className="text-blue-600 focus:ring-blue-500"
                  />

                  <span>{cat.name}</span>

                </div>
              </label>
            );
          })}

        </div>
      </div>

    </div>
  );
}