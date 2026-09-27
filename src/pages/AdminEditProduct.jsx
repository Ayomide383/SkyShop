import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getProductById,
  updateProduct,
  setPrimaryProductImage,
  uploadProductImage,
  createProductImage,
  deleteProductImage,
  deleteProductImageFile,
} from '../services/adminService';

export default function AdminEditProduct() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [primaryImageId, setPrimaryImageId] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [formData, setFormData] = useState({
  name: '',
  description: '',
  price: '',
  stock: '',
  brand: '',
  category: '',
});

 const loadProduct = async () => {
  try {
    const data = await getProductById(id);

    setProduct(data);

    const primaryImage = data.product_images?.find(
      (image) => image.is_primary
    );

    setPrimaryImageId(primaryImage?.id ?? null);

    setFormData({
      name: data.name || '',
      description: data.description || '',
      price: data.price || '',
      stock: data.stock || '',
      brand: data.brand || '',
      category: data.category || '',
    });
  } catch (error) {
    console.error('Load product error:', error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  loadProduct();
}, [id]);

  const handleNewImages = (e) => {
  const files = Array.from(e.target.files);

  if (files.length === 0) return;

  const images = files.map((file) => ({
    file,
    preview: URL.createObjectURL(file),
  }));

  setNewImages((current) => [
    ...current,
    ...images,
  ]);

  e.target.value = '';
};

  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((current) => ({
    ...current,
    [name]: value,
  }));
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setSaving(true);

    const updatedProduct = await updateProduct(
      id,
      formData
    );

    setProduct(updatedProduct);

    for (const image of newImages) {
  const imageUrl = await uploadProductImage(
    image.file,
    id
  );

  await createProductImage(
    id,
    imageUrl,
    false
  );
    }

    alert('Product updated successfully!');
    setNewImages([]);
    await loadProduct();
  } catch (error) {
    console.error('Update product error:', error);
    alert(error.message);
  } finally {
    setSaving(false);
  }
};

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-slate-500">
          Loading product...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6">
        <p className="text-red-500">
          Product not found.
        </p>
      </div>
    );
  }

  return (
   <form
  onSubmit={handleSubmit}
  className="mt-6 space-y-6 rounded-xl border border-slate-200 bg-white p-6"
>

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
      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
    />
  </div>

  {/* Description */}
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-2">
      Description
    </label>

    <textarea
      name="description"
      value={formData.description}
      onChange={handleChange}
      rows="5"
      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
    />
  </div>

  {/* Price + Stock */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Price
      </label>

      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Stock
      </label>

      <input
        type="number"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
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
      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
    />
  </div>

  {/* Category */}
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-2">
      Category
    </label>

    <input
      type="text"
      name="category"
      value={formData.category}
      onChange={handleChange}
      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
    />
  </div>

     {/* Product Images */}
<div>
  <label className="block text-sm font-medium text-slate-700 mb-3">
    Product Images
  </label>

  {product.product_images?.length > 0 ? (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {product.product_images.map((image) => (
        <div
          key={image.id}
          className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
        >
          <img
            src={image.image_url}
            alt={product.name}
            className="h-36 w-full object-cover"
          />
          <button
  type="button"
  onClick={async () => {
  try {
    await setPrimaryProductImage(product.id, image.id);

    setPrimaryImageId(image.id);

    setProduct((current) => ({
      ...current,
      product_images: current.product_images.map((item) => ({
        ...item,
        is_primary: item.id === image.id,
      })),
    }));
  } catch (error) {
    console.error('Set primary image error:', error);
    alert(error.message);
  }
}}
  className={`absolute bottom-2 left-2 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
    primaryImageId === image.id
      ? 'bg-sky-500 text-white'
      : 'bg-white text-slate-600 shadow-sm hover:bg-slate-50'
  }`}
>
  {primaryImageId === image.id
    ? 'Primary'
    : 'Make Primary'}
</button>

          <button
  type="button"
  onClick={async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this image?'
    );

    if (!confirmed) return;

    try {
      const wasPrimary = image.id === primaryImageId;

      await deleteProductImage(image.id);

      await deleteProductImageFile(image.image_url);

      if (wasPrimary) {
        const remainingImages = product.product_images.filter(
          (item) => item.id !== image.id
        );

        if (remainingImages.length > 0) {
          await setPrimaryProductImage(
            product.id,
            remainingImages[0].id
          );
        }
      }

      await loadProduct();

      alert('Image deleted successfully!');
    } catch (error) {
      console.error(
        'Delete product image error:',
        error
      );

      alert(error.message);
    }
  }}
  className="absolute right-2 bottom-2 rounded-full bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600 transition"
>
  Delete
</button>

          {image.is_primary && (
            <span className="absolute left-2 top-2 rounded-full bg-sky-500 px-2.5 py-1 text-xs font-semibold text-white">
              Primary
            </span>
          )}
        </div>
      ))}
    </div>
  ) : (
    <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center">
      <p className="text-sm text-slate-500">
        No product images yet.
      </p>
    </div>
  )}
  <div className="mt-5">
  <label className="block text-sm font-medium text-slate-700 mb-2">
    Add New Images
  </label>

  <input
    type="file"
    accept="image/jpeg,image/png,image/webp"
    multiple
    onChange={handleNewImages}
    className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600"
  />
</div>

  {newImages.length > 0 && (
  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
    {newImages.map((image, index) => (
      <div
        key={index}
        className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
      >
        <img
          src={image.preview}
          alt={`New product ${index + 1}`}
          className="h-36 w-full object-cover"
        />
      </div>
    ))}
  </div>
)}
</div>

  <button
  type="submit"
  disabled={saving}
  className="rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-600 disabled:opacity-50 transition"
>
  {saving ? 'Saving...' : 'Save Changes'}
</button>

</form>
  );
}