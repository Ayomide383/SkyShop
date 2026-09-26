import { supabase } from '../lib/supabase';

export async function createOrder(userId, orderData) {
  const { data, error } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      full_name: orderData.fullName,
      email: orderData.email,
      phone: orderData.phone,
      address: orderData.address,
      city: orderData.city,
      state: orderData.state,
      zip_code: orderData.zipCode,
      subtotal: orderData.subtotal,
      shipping: orderData.shipping,
      tax: orderData.tax,
      total: orderData.total,
      payment_method: orderData.paymentMethod,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Order Error: ${error.message}`);
  }

  return data;
}

export async function createOrderItems(orderId, items) {
  const orderItems = items.map((item) => ({
    order_id: orderId,
    product_id: item.id,
    product_name: item.title,
    unit_price: Number(item.price),
    quantity: item.quantity,
    subtotal: Number(item.price) * item.quantity,
  }));

  const { data, error } = await supabase
    .from('order_items')
    .insert(orderItems)
    .select();

  if (error) {
    throw new Error(`Order Items Error: ${error.message}`);
  }

  return data;
}

export async function getOrderById(userId, orderId) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .eq('user_id', userId)
    .single();

  if (error) {
    throw new Error(`Order Error: ${error.message}`);
  }

  return data;
}

export async function getUserOrders(userId) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      id,
      full_name,
      subtotal,
      shipping,
      tax,
      total,
      payment_method,
      payment_status,
      order_status,
      created_at
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Orders Error: ${error.message}`);
  }

  return data;
}

export async function getOrderDetails(userId, orderId) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .eq('user_id', userId)
    .single();

  if (error) {
    throw new Error(`Order Details Error: ${error.message}`);
  }

  return data;
}

export async function getOrderItems(orderId) {
  const { data, error } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', orderId)
    .order('id', { ascending: true });

  if (error) {
    throw new Error(`Order Items Error: ${error.message}`);
  }

  return data;
}