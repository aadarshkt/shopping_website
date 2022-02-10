import React, { useState, useEffect } from "react";
import ProductsList from "./components/ProductsList";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import data from "./data";

const App = () => {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState({
    name: " ",
    quantity: 0,
    imgUrl: " ",
    amount: 350,
    description: " ",

  });

  let navigate = useNavigate()

  const handleAddToCart = () => {
    setCart(cart+1)
  };

  const handleRemoveFromCart = () => {
    if(cart == 0) return;
    setCart(cart-1);
  }


  const handleEmptyCart = () => {
    setCart(0);
  }


  return (
    <>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <div className="flex h-screen bg-gradient-to-r from-yellow-500 via-purple-500 to-pink-500 ">
              <div className="flex flex-col">
                <Header
                  cart={cart}
                  onRemoveFromCart={handleRemoveFromCart}
                  onEmptyCart={handleEmptyCart}
                />
                <div className="flex flex-row grow justify-center items-center">
                  <ProductsList
                    products={products}
                    onAddCart={handleAddToCart}
                  />
                </div>
              </div>
            </div>
          }
        />
        <Route
          path="/checkout"
          exact
          element={
            <Checkout cart={cart} />
          }
        />
        <Route
          path="/confirmation"
          exact
          element={
            <Confirmation />
          }
        />
      </Routes>
      </>
  );
};

export default App;
