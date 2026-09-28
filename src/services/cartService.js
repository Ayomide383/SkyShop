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
        stock
      )
    `)
    .eq('user_id', userId);

  if (error) {
    throw new Error(`Cart Error: ${error.message}`);
  }

  return data;
}

export async function addToCart(userId, productId) {
  // Check product stock
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('stock, is_active')
    .eq('id', productId)
    .single();

  if (productError) {
    throw new Error(`Cart Error: ${productError.message}`);
  }

  if (!product.is_active) {
    throw new Error('This product is no longer available.');
  }

  if (product.stock <= 0) {
    throw new Error('This product is out of stock.');
  }

  // Check existing cart item
  const { data: existingItem, error: fetchError } = await supabase
    .from('cart_items')
    .select('id, quantity')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .maybeSingle();

  if (fetchError) {
    throw new Error(`Cart Error: ${fetchError.message}`);
  }

  if (existingItem) {
    const newQuantity = existingItem.quantity + 1;

    if (newQuantity > product.stock) {
      throw new Error(
        `Only ${product.stock} item${
          product.stock === 1 ? '' : 's'
        } available in stock.`
      );
    }

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

  // Add new cart item
  const { data, error } = await supabase
    .from('cart_items')
    .insert({
      user_id: userId,
      product_id: productId,
      quantity: 1,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Cart Error: ${error.message}`);
  }

  return data;
}

export async function updateCartQuantity(userId, productId, quantity) {
  // Get current product stock
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('stock, is_active')
    .eq('id', productId)
    .single();

  if (productError) {
    throw new Error(`Cart Error: ${productError.message}`);
  }

  if (!product.is_active) {
    throw new Error('This product is no longer available.');
  }

  if (quantity < 1) {
    throw new Error('Quantity must be at least 1.');
  }

  if (quantity > product.stock) {
    throw new Error(
      `Only ${product.stock} item${
        product.stock === 1 ? '' : 's'
      } available in stock.`
    );
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