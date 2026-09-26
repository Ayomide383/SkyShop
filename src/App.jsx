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
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


function App() {
  
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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

  const existingItem = cartItems.find(
    item => item.id === product.id
  );

  const oldCartItems = cartItems;

  // Update UI immediately
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

  try {
    // Save to Supabase
    for (let i = 0; i < quantity; i++) {
      await addToCart(user.id, product.id);
    }
  } catch (error) {
    // Restore previous cart if saving fails
    setCartItems(oldCartItems);

    alert(error.message);
  }
};

  return (
    <>

      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartItems={cartItems}
/>

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

      <Footer />

    </>
  );
}


export default App;