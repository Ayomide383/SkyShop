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
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';


function App() {

  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddToCart = (product, quantity = 1) => {
  setCartItems((currentItems) => {
    const existingItem = currentItems.find(
      item => item.id === product.id
    );

    if (existingItem) {
      return currentItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
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
};

  return (
    <BrowserRouter>

      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartItems={cartItems}
/>

      <Routes>

        <Route path="/" element={<Home onAddToCart={handleAddToCart}/>} />

        <Route
          path="/shop"
          element={
            <ShopPage
  onAddToCart={handleAddToCart}
  searchQuery={searchQuery}
/>
          }
        />

        <Route
          path="/product/:id"
          element={<ProductPage onAddToCart={handleAddToCart}/>}
        />

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
  path="/deals"
  element={
    <Deals onAddToCart={handleAddToCart} />
  }
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
          path="/profile"
          element={<ProfilePage />}
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}


export default App;