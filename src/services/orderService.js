import { supabase } from '../lib/supabase';

export async function createOrder(userId, orderData) {
  const items = orderData.items.map((item) => ({
    product_id: item.id,
    product_name: item.title,
    unit_price: Number(item.price),
    quantity: item.quantity,
    subtotal: Number(item.price) * item.quantity,
  }));

  const { data, error } = await supabase.rpc(
    'create_order_with_stock',
    {
      p_user_id: userId,
      p_full_name: orderData.fullName,
      p_email: orderData.email,
      p_phone: orderData.phone,
      p_address: orderData.address,
      p_city: orderData.city,
      p_state: orderData.state,
      p_zip_code: orderData.zipCode,
      p_subtotal: orderData.subtotal,
      p_shipping: orderData.shipping,
      p_tax: orderData.tax,
      p_total: orderData.total,
      p_payment_method: orderData.paymentMethod,
      p_items: items,
    }
  );

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

export async function getAllOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      id,
      user_id,
      full_name,
      email,
      phone,
      address,
      city,
      state,
      zip_code,
      subtotal,
      shipping,
      tax,
      total,
      payment_method,
      payment_status,
      order_status,
      created_at,
      order_items (
        id,
        product_id,
        product_name,
        unit_price,
        quantity,
        subtotal
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Admin Orders Error: ${error.message}`);
  }

  return data;
}

export async function updateOrderStatus(orderId, status) {
  const { data, error } = await supabase
    .from('orders')
    .update({
      order_status: status,
    })
    .eq('id', orderId)
    .select()
    .single();

  if (error) {
    throw new Error(`Update Order Status Error: ${error.message}`);
  }

  return data;
}