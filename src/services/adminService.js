import { supabase } from '../lib/supabase';

export async function getProductCount() {
  const { count, error } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });

  if (error) {
    throw new Error(`Product Count Error: ${error.message}`);
  }

  return count ?? 0;
}

export async function getOrderCount() {
  const { count, error } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true });

  if (error) {
    throw new Error(`Order Count Error: ${error.message}`);
  }

  return count ?? 0;
}

export async function getPendingOrderCount() {
  const { count, error } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .eq('order_status', 'pending');

  if (error) {
    throw new Error(`Pending Order Count Error: ${error.message}`);
  }

  return count ?? 0;
}

export async function getCustomerCount() {
  const { count, error } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true });

  if (error) {
    throw new Error(`Customer Count Error: ${error.message}`);
  }

  return count ?? 0;
}

export async function getOrderStatusCounts() {
  const { data, error } = await supabase
    .from('orders')
    .select('order_status');

  if (error) {
    throw new Error(`Order Status Count Error: ${error.message}`);
  }

  return data.reduce(
    (counts, order) => {
      counts[order.order_status] =
        (counts[order.order_status] || 0) + 1;

      return counts;
    },
    {
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    }
  );
}

export async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      price,
      category,
      brand,
      stock,
      rating,
      image_url,
      is_active,
      product_images (
        id,
        image_url,
        is_primary
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Admin Products Error: ${error.message}`);
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
        price,
        quantity
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Admin Orders Error: ${error.message}`);
  }

  return data;
}

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name')
    .order('name', { ascending: true });

  if (error) {
    throw new Error(`Categories Error: ${error.message}`);
  }

  return data;
}

export async function createCategory(name) {
  const { data, error } = await supabase
    .from('categories')
    .insert({
      name: name.trim(),
    })
    .select('id, name')
    .single();

  if (error) {
    throw new Error(`Create Category Error: ${error.message}`);
  }

  return data;
}

export async function createProduct(productData) {
  const { data, error } = await supabase
    .from('products')
    .insert({
      name: productData.name,
      description: productData.description,
      price: productData.price,
      stock: productData.stock,
      brand: productData.brand,
      category: productData.category,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Create Product Error: ${error.message}`);
  }

  return data;
}

export async function uploadProductImage(file, productId) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${productId}/${fileName}`;

  const { error } = await supabase.storage
    .from('product-images')
    .upload(filePath, file);

  if (error) {
    throw new Error(`Image Upload Error: ${error.message}`);
  }

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export async function createProductImage(productId, imageUrl, isPrimary) {
  const { data, error } = await supabase
    .from('product_images')
    .insert({
      product_id: productId,
      image_url: imageUrl,
      is_primary: isPrimary,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Product Image Error: ${error.message}`);
  }

  return data;
}

export async function getProductById(productId) {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      description,
      price,
      category,
      brand,
      stock,
      rating,
      image_url,
      product_images (
        id,
        image_url,
        is_primary
      )
    `)
    .eq('id', productId)
    .single();

  if (error) {
    throw new Error(`Get Product Error: ${error.message}`);
  }

  return data;
}

export async function updateProduct(productId, productData) {
  const { data, error } = await supabase
    .from('products')
    .update({
      name: productData.name,
      description: productData.description,
      price: productData.price,
      stock: productData.stock,
      brand: productData.brand,
      category: productData.category,
    })
    .eq('id', productId)
    .select()
    .single();

  if (error) {
    throw new Error(`Update Product Error: ${error.message}`);
  }

  return data;
}

export async function setPrimaryProductImage(
  productId,
  imageId
) {
  const { error: resetError } = await supabase
    .from('product_images')
    .update({ is_primary: false })
    .eq('product_id', productId);

  if (resetError) {
    throw new Error(
      `Reset Primary Image Error: ${resetError.message}`
    );
  }

  const { data, error } = await supabase
    .from('product_images')
    .update({ is_primary: true })
    .eq('id', imageId)
    .eq('product_id', productId)
    .select()
    .single();

  if (error) {
    throw new Error(
      `Set Primary Image Error: ${error.message}`
    );
  }

  return data;
}

export async function deleteProductImage(imageId) {
  const { data, error } = await supabase
    .from('product_images')
    .delete()
    .eq('id', imageId)
    .select()
    .single();

  if (error) {
    throw new Error(
      `Delete Product Image Error: ${error.message}`
    );
  }

  return data;
}

export async function deleteProductImageFile(imageUrl) {
  const marker = '/product-images/';

  const index = imageUrl.indexOf(marker);

  if (index === -1) {
    throw new Error('Invalid product image URL.');
  }

  const filePath = imageUrl.substring(
    index + marker.length
  );

  const { error } = await supabase.storage
    .from('product-images')
    .remove([filePath]);

  if (error) {
    throw new Error(
      `Delete Image File Error: ${error.message}`
    );
  }
}

export async function deleteProduct(productId) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId);

  if (error) {
    throw new Error(
      `Delete Product Error: ${error.message}`
    );
  }
}

export async function deactivateProduct(productId) {
  const { data, error } = await supabase
    .from('products')
    .update({
      is_active: false,
    })
    .eq('id', productId)
    .select()
    .single();

  if (error) {
    throw new Error(
      `Deactivate Product Error: ${error.message}`
    );
  }

  return data;
}

export async function reactivateProduct(productId) {
  const { data, error } = await supabase
    .from('products')
    .update({
      is_active: true,
    })
    .eq('id', productId)
    .select()
    .single();

  if (error) {
    throw new Error(
      `Reactivate Product Error: ${error.message}`
    );
  }

  return data;
}


export async function getAllCustomers() {
  const { data, error } = await supabase.rpc(
    'get_admin_customers'
  );

  if (error) {
    throw new Error(
      `Admin Customers Error: ${error.message}`
    );
  }

  return data;
}

export async function getCustomerOrders(userId) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      id,
      total,
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
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(
      `Customer Orders Error: ${error.message}`
    );
  }

  return data;
}

export async function disableCustomer(userId) {
  const { error } = await supabase.rpc(
    'disable_customer',
    {
      customer_id: userId,
    }
  );

  if (error) {
    throw new Error(
      `Disable Customer Error: ${error.message}`
    );
  }
}

export async function enableCustomer(userId) {
  const { error } = await supabase.rpc(
    'enable_customer',
    {
      customer_id: userId,
    }
  );

  if (error) {
    throw new Error(
      `Enable Customer Error: ${error.message}`
    );
  }
}

export async function makeCustomerAdmin(userId) {
  const { error } = await supabase.rpc(
    'make_customer_admin',
    {
      customer_id: userId,
    }
  );

  if (error) {
    throw new Error(
      `Make Admin Error: ${error.message}`
    );
  }
}

export async function removeCustomerAdmin(userId) {
  const { error } = await supabase.rpc(
    'remove_customer_admin',
    {
      customer_id: userId,
    }
  );

  if (error) {
    throw new Error(
      `Remove Admin Error: ${error.message}`
    );
  }
}