import React, { useEffect, useState } from 'react';
import {
  getCategories,
  createCategory,
  createProduct,
  uploadProductImage,
  createProductImage,
} from '../services/adminService';

export default function AdminAddProduct() {
  const [categories, setCategories] = useState([]);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [primaryImage, setPrimaryImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
  name: '',
  description: '',
  price: '',
  stock: '',
  brand: '',
  category: '',
});


  useEffect(() => {
  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Load categories error:', error);
    }
  };

  loadCategories();
}, []);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name.trim()) {
    alert('Please enter a product name.');
    return;
  }

  if (!formData.price) {
    alert('Please enter a product price.');
    return;
  }

  if (!formData.category) {
    alert('Please select a category.');
    return;
  }

  try {
    setSaving(true);

    // 1. Create the product
    const product = await createProduct(formData);

    // 2. Upload product images
    for (let i = 0; i < imageFiles.length; i++) {
      const image = imageFiles[i];

      const imageUrl = await uploadProductImage(
        image.file,
        product.id
      );

      // 3. Save image information
      await createProductImage(
        product.id,
        imageUrl,
        primaryImage === i
      );
    }

    alert('Product added successfully!');
    setFormData({
  name: '',
  description: '',
  price: '',
  stock: '',
  brand: '',
  category: '',
});

setImageFiles([]);
setPrimaryImage(null);

setNewCategoryName('');
setShowNewCategory(false);

  } catch (error) {
    console.error('Create product error:', error);
    alert(error.message);
  } finally {
    setSaving(false);
  }
};

  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((current) => ({
    ...current,
    [name]: value,
  }));
};

  const handleImageChange = (e) => {
  const files = Array.from(e.target.files);

  if (files.length === 0) return;

  const newImages = files.map((file) => ({
    file,
    preview: URL.createObjectURL(file),
  }));

  setImageFiles((current) => {
    const updated = [...current, ...newImages];

    if (primaryImage === null && updated.length > 0) {
      setPrimaryImage(0);
    }

    return updated;
  });
};


  const handleCreateCategory = async () => {
  if (!newCategoryName.trim()) {
    alert('Please enter a category name.');
    return;
  }

  try {
    setCategoryLoading(true);

    const newCategory = await createCategory(newCategoryName);

    setCategories((current) => [
      ...current,
      newCategory,
    ]);

    setFormData((current) => ({
      ...current,
      category: newCategory.name,
    }));

    setNewCategoryName('');
    setShowNewCategory(false);
  } catch (error) {
    console.error('Create category error:', error);
    alert(error.message);
  } finally {
    setCategoryLoading(false);
  }
};
  
  
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-2xl font-bold text-slate-900">
          Add Product
        </h1>

        <p className="mt-1 text-slate-500">
          Add a new product to your SkyShop store.
        </p>

        <div className="mt-8 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <form className="space-y-6" 
            onSubmit={handleSubmit}>

  {/* Product Name */}
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-2">
      Product Name
    </label>

    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      placeholder="Enter product name"
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
    />
  </div>

  {/* Description */}
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-2">
      Description
    </label>

    <textarea
      rows="4"
      name="description"
      value={formData.description}
      onChange={handleChange}
      placeholder="Enter product description"
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none resize-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
    />
  </div>

  {/* Price + Stock */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

    {/* Price */}
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Price
      </label>

      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        min="0"
        placeholder="25000"
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
      />
    </div>

    {/* Stock */}
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Stock
      </label>

      <input
        type="number"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        min="0"
        placeholder="20"
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
      />
    </div>

  </div>

  {/* Brand */}
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-2">
      Brand
    </label>

    <input
      type="text"
      name="brand"
      value={formData.brand}
      onChange={handleChange}
      placeholder="e.g. Samsung"
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
    />
  </div>
{/* Category */}
<div>
  <div className="flex items-center justify-between mb-2">
    <label className="block text-sm font-medium text-slate-700">
      Category
    </label>

    <button
      type="button"
      onClick={() => setShowNewCategory(!showNewCategory)}
      className="text-sm font-medium text-sky-600 hover:text-sky-700"
    >
      + Add category
    </button>
  </div>

  <select
    name="category"
    value={formData.category}
    onChange={handleChange}
    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
  >
    <option value="">
      Select a category
    </option>

    {categories.map((category) => (
      <option key={category.id} value={category.name}>
        {category.name}
      </option>
    ))}
  </select>

  {showNewCategory && (
    <div className="mt-3 flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
        placeholder="New category name"
        className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
      />

      <button
        type="button"
        onClick={handleCreateCategory}
        disabled={categoryLoading}
        className="rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-600 disabled:opacity-50"
      >
        {categoryLoading ? 'Adding...' : 'Add'}
      </button>
    </div>
  )}
</div>

{/* Product Images */}
<div>
  <label className="block text-sm font-medium text-slate-700 mb-2">
    Product Images
  </label>

  <input
    type="file"
    accept="image/png,image/jpeg,image/webp"
    multiple
    onChange={handleImageChange}
    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600"
  />

  {imageFiles.length > 0 && (
    <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
      {imageFiles.map((image, index) => (
        <div
          key={index}
          className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50"
        >
          <img
            src={image.preview}
            alt={`Product ${index + 1}`}
            className="w-full h-32 object-cover"
          />

          {/* Primary */}
          <button
            type="button"
            onClick={() => setPrimaryImage(index)}
            className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${
              primaryImage === index
                ? 'bg-sky-500 text-white'
                : 'bg-white text-slate-600'
            }`}
          >
            {primaryImage === index ? 'Primary' : 'Make Primary'}
          </button>

          {/* Remove */}
          <button
            type="button"
            onClick={() => {
              setImageFiles((current) =>
                current.filter((_, i) => i !== index)
              );

              if (primaryImage === index) {
                setPrimaryImage(null);
              }
            }}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white text-red-500 shadow-sm"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )}
</div>

  {/* Buttons */}
  <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">

    <button
      type="button"
      className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50"
    >
      Cancel
    </button>

    <button
  type="submit"
  disabled={saving}
  className="rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-600 disabled:opacity-50"
>
  {saving ? 'Adding...' : 'Add Product'}
</button>

  </div>

</form>
        </div>

      </div>
    </div>
  );
}