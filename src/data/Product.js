const API_URL = 'https://dummyjson.com/products';

export async function getProducts(limit = 0) {
  const response = await fetch(`${API_URL}?limit=${limit}`);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const data = await response.json();

  return data.products.map((product) => ({
    id: product.id,
    title: product.title,
    category: product.category,
    price: product.price,
    rating: product.rating,
    reviews: product.reviews?.length || 0,
    image: product.thumbnail,
    images: product.images || [],
    description: product.description,
    brand: product.brand,
  }));
}

export default [];