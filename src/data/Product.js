import { supabase } from '../lib/supabase';

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images (
        id,
        image_url,
        is_primary
      )
    `);

  if (error) {
    throw new Error(`Supabase Error: ${error.message}`);
  }

  return data.map((product) => ({
    id: product.id,
    title: product.name,
    category: product.category,
    price: product.price,
    rating: product.rating,
    reviews: 0,
    image:
      product.product_images?.find((img) => img.is_primary)?.image_url ||
      product.product_images?.[0]?.image_url ||
      product.image_url,
    images:
      product.product_images
        ?.sort((a, b) => Number(b.is_primary) - Number(a.is_primary))
        .map((img) => img.image_url) || [],
    description: product.description,
    brand: product.brand,
  }));
}

export default [];