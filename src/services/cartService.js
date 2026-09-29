import { supabase } from '../lib/supabase';

export async function getCartItems(userId) {
  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      id,
      quantity,
      product_id,
      products (
        id,
        name,
        price,
        image_url,
        category,
        brand,
        rating,
        stock,
        product_images (
          id,
          image_url,
          is_primary
        )
      )
    `)
    .eq('user_id', userId);

  if (error) {
    throw new Error(`Cart Error: ${error.message}`);
  }

  return data;
}


export async function addToCart(userId, productId, quantity = 1) {
  /*
    First, get the CURRENT stock directly from Supabase.
    This prevents the frontend from adding products that
    are already out of stock.
  */
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('id, stock, is_active')
    .eq('id', productId)
    .single();

  if (productError) {
    throw new Error(`Product Error: ${productError.message}`);
  }

  /*
    Make sure the product is still available.
  */
  if (!product.is_active) {
    throw new Error('This product is no longer available.');
  }

  /*
    Product has completely sold out.
  */
  if (Number(product.stock) <= 0) {
    throw new Error('This product is out of stock.');
  }

  /*
    Get the quantity already inside the user's cart.
  */
  const { data: existingItem, error: fetchError } = await supabase
    .from('cart_items')
    .select('id, quantity')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .maybeSingle();

  if (fetchError) {
    throw new Error(`Cart Error: ${fetchError.message}`);
  }

  const currentQuantity = existingItem
    ? Number(existingItem.quantity)
    : 0;

  const requestedQuantity = Number(quantity);

  /*
    Make sure the requested quantity is valid.
  */
  if (!Number.isInteger(requestedQuantity) || requestedQuantity < 1) {
    throw new Error('Invalid cart quantity.');
  }

  const newQuantity = currentQuantity + requestedQuantity;

  /*
    Do not allow the cart quantity to exceed
    the product's current stock.
  */
  if (newQuantity > Number(product.stock)) {
    throw new Error(
      `Only ${product.stock} item${
        Number(product.stock) === 1 ? '' : 's'
      } available in stock.`
    );
  }

  /*
    Product already exists in cart.
    Update its quantity.
  */
  if (existingItem) {
    const { data, error } = await supabase
      .from('cart_items')
      .update({
        quantity: newQuantity,
      })
      .eq('id', existingItem.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Cart Error: ${error.message}`);
    }

    return data;
  }

  /*
    Product isn't in the cart yet.
    Create a new cart item.
  */
  const { data, error } = await supabase
    .from('cart_items')
    .insert({
      user_id: userId,
      product_id: productId,
      quantity: requestedQuantity,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Cart Error: ${error.message}`);
  }

  return data;
}


export async function updateCartQuantity(
  userId,
  productId,
  quantity
) {
  /*
    Get the current product stock before changing
    the cart quantity.
  */
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('stock, is_active')
    .eq('id', productId)
    .single();

  if (productError) {
    throw new Error(`Product Error: ${productError.message}`);
  }

  if (!product.is_active) {
    throw new Error('This product is no longer available.');
  }

  if (Number(product.stock) <= 0) {
    throw new Error('This product is out of stock.');
  }

  if (Number(quantity) > Number(product.stock)) {
    throw new Error(
      `Only ${product.stock} item${
        Number(product.stock) === 1 ? '' : 's'
      } available in stock.`
    );
  }

  if (!Number.isInteger(Number(quantity)) || Number(quantity) < 1) {
    throw new Error('Invalid cart quantity.');
  }

  const { data, error } = await supabase
    .from('cart_items')
    .update({
      quantity,
    })
    .eq('user_id', userId)
    .eq('product_id', productId)
    .select()
    .single();

  if (error) {
    throw new Error(`Cart Error: ${error.message}`);
  }

  return data;
}


export async function deleteCartItem(userId, productId) {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId);

  if (error) {
    throw new Error(`Cart Error: ${error.message}`);
  }
}


export async function clearCart(userId) {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userId);

  if (error) {
    throw new Error(`Cart Error: ${error.message}`);
  }
}