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
    `)
    .eq('is_active', true);

  if (error) {
    throw new Error(`Products Error: ${error.message}`);
  }

  // Get review information for all products
  const productIds = data.map((product) => product.id);

  let reviews = [];

  if (productIds.length > 0) {
    const { data: reviewData, error: reviewError } =
      await supabase
        .from('reviews')
        .select('product_id, rating')
        .in('product_id', productIds);

    if (reviewError) {
      console.error(
        'Error fetching product reviews:',
        reviewError
      );
    } else {
      reviews = reviewData || [];
    }
  }

  return data.map((product) => {
    // Get reviews belonging to this product
    const productReviews = reviews.filter(
      (review) => review.product_id === product.id
    );

    // Calculate average rating
    const averageRating =
      productReviews.length > 0
        ? productReviews.reduce(
            (sum, review) => sum + review.rating,
            0
          ) / productReviews.length
        : 0;

    return {
      id: product.id,
      title: product.name,
      category: product.category,
      price: product.price,

      // Real review rating
      rating: Number(averageRating.toFixed(1)),

      // Real review count
      reviews: productReviews.length,

      image:
        product.product_images?.find(
          (img) => img.is_primary
        )?.image_url ||
        product.product_images?.[0]?.image_url ||
        product.image_url,

      images:
        product.product_images
          ?.sort(
            (a, b) =>
              Number(b.is_primary) -
              Number(a.is_primary)
          )
          .map((img) => img.image_url) || [],

      description: product.description,
      brand: product.brand,
      stock: product.stock,
    };
  });
}

export default [];