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
        rating
      )
    `)
    .eq('user_id', userId);

  if (error) {
    throw new Error(`Cart Error: ${error.message}`);
  }

  return data;
}

export async function addToCart(userId, productId) {
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
    const { data, error } = await supabase
      .from('cart_items')
      .update({
        quantity: existingItem.quantity + 1,
      })
      .eq('id', existingItem.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Cart Error: ${error.message}`);
    }

    return data;
  }

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