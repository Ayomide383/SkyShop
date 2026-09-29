import { supabase } from './lib/supabase';

import AdminLayout from './components/AdminLayout.jsx';
import AdminProducts from './pages/AdminProducts.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import NotFoundPage from './pages/404 Error Page.jsx';
import ChechoutPage from './pages/CheckoutPage.jsx';
import Cart from './pages/Cart.jsx';
import ProductPage from './pages/ProductPage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import Home from './pages/Home.jsx';
import Deals from './pages/Deals.jsx';
import About from './pages/About.jsx';
import SignUp from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import { addToCart, getCartItems } from './services/cartService';
import { useAuth } from './context/AuthContext.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx';
import Orders from './pages/Orders.jsx';
import OrderDetails from './pages/OrderDetails.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminOrders from './pages/AdminOrders.jsx';
import AdminAddProduct from './pages/AdminAddProduct.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminEditProduct from './pages/AdminEditProduct.jsx';
import AdminCustomers from './pages/AdminCustomers';
import AuthCallback from './pages/AuthCallback.jsx';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


function App() {
  const location = useLocation();
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    const checkAdminAndRedirect = async () => {
      if (!user) return;

      if (
        location.pathname.startsWith('/admin') ||
        location.pathname === '/auth/callback'
      ) {
        return;
      }

      const { data: isAdmin, error } =
        await supabase.rpc('is_admin');

      if (error) {
        console.error('Admin redirect check error:', error);
        return;
      }

      console.log('Is current user admin:', isAdmin);

      if (isAdmin === true) {
        navigate('/admin', { replace: true });
      }
    };

    checkAdminAndRedirect();
  }, [user, location.pathname, navigate]);

  useEffect(() => {
  const loadCart = async () => {
    if (!user) return;

    try {
      const items = await getCartItems(user.id);

      const formattedItems = items.map((item) => ({
  id: item.products.id,
  title: item.products.name,
  price: item.products.price,
  image: item.products.image_url,
  category: item.products.category,
  brand: item.products.brand,
  rating: item.products.rating,
  quantity: item.quantity,
  stock: item.products.stock,
}));

      setCartItems(formattedItems);
    } catch (error) {
      console.error('Load cart error:', error);
      alert(`Load cart error: ${error.message}`);
    }
  };

  loadCart();
}, [user]);

  const handleAddToCart = async (product, quantity = 1) => {
  if (!user) {
    navigate('/login');
    return;
  }

  const oldCartItems = cartItems;

  try {
    // Save to Supabase first.
    // addToCart() now checks the real stock.
    await addToCart(
      user.id,
      product.id,
      quantity
    );

    // Only update the UI after Supabase accepts it.
    setCartItems(currentItems => {
      const existingItem = currentItems.find(
        item => item.id === product.id
      );

      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity
        }
      ];
    });

  } catch (error) {
    // Keep the existing cart unchanged.
    setCartItems(oldCartItems);

    console.error('Add to cart error:', error);

    alert(error.message);
  }
};
  return (
    <>

      {!isAdminPage && (
  <Header
    searchQuery={searchQuery}
    setSearchQuery={setSearchQuery}
    cartItems={cartItems}
  />
)}

      <Routes>

        <Route
  path="/signup"
  element={<SignUp />}
/>

        <Route
  path="/login"
  element={<Login />}
/>

        <Route
  path="/auth/callback"
  element={<AuthCallback />}
/>

        
        <Route
  path="/forgot-password"
  element={<ForgotPassword />}
          
/>

        <Route
  path="/deals"
  element={
    <Deals onAddToCart={handleAddToCart} />
  }
/>

        <Route path="/" element={<Home onAddToCart={handleAddToCart}/>} />
        <Route
          path="/shop"
          element={
            <ShopPage  onAddToCart={handleAddToCart}  searchQuery={searchQuery} />  } />

        <Route
          path="/product/:id"
          element={<ProductPage onAddToCart={handleAddToCart}/>}
        />
        <Route
  path="/about"
  element={<About />}
/>

                <Route
          path="*"
          element={<NotFoundPage />}
        />
        
        <Route
  path="/reset-password"
  element={<ResetPassword />}
/>

      <Route element={<ProtectedRoute />}>

        
        <Route element={<AdminRoute />}>
  <Route element={<AdminLayout />}>
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/admin/orders" element={<AdminOrders />} />
    <Route path="/admin/customers" element={<AdminCustomers />} />
    <Route path="/admin/products" element={<AdminProducts />} />
    <Route path="/admin/products/add" element={<AdminAddProduct />} />
    <Route path="/admin/products/edit/:id" element={<AdminEditProduct />} />
  </Route>
</Route>

        
        <Route path="/order-success/:orderId" element={<OrderSuccess />} />

        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          }
        />

       <Route
  path="/checkout"
  element={
    <ChechoutPage
      cartItems={cartItems}
      setCartItems={setCartItems}
    />
  }
/>

      
        <Route
          path="/profile"
          element={<ProfilePage />}
        />
<Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />
      </Route>
      </Routes>

      {!isAdminPage && <Footer />}

    </>
  );
}


export default App;