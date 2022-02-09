import React, { useState, useEffect } from "react";
import ProductsList from "./components/ProductsList";
import commerce from "./lib/commerce";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});

  const fetchProducts = () => {
    commerce.products
      .list()
      .then((products) => {
        setProducts(products.data);
      })
      .catch((error) => {
        console.log("There was an error fetching the products", error);
      });
  };

  const fetchCart = () => {
    commerce.cart
      .retrieve()
      .then((cart) => {
        setCart(cart);
        console.log(cart);
      })
      .catch((error) => {
        console.log("There was an error loading the cart", error);
      });
  };

  const handleAddToCart = (productId, quantity) => {
    commerce.cart
      .add(productId, quantity)
      .then((item) => {
        setCart(item.cart);
      })
      .catch((error) => {
        console.error("There was an error adding the item to the cart", error);
      });
  };

  const handleUpdateCartQty = (lineItemId, quantity) => {
    commerce.cart
      .update(lineItemId, { quantity })
      .then((resp) => {
        setCart(resp.cart);
      })
      .catch((error) => {
        console.log("There was an error updating the cart items", error);
      });
  };

  const handleRemoveFromCart = (lineItemId) => {
    commerce.cart
      .remove(lineItemId)
      .then((resp) => {
        setCart(resp.cart);
      })
      .catch((error) => {
        console.error(
          "There was an error removing the item from the cart",
          error
        );
      });
  };

  const handleEmptyCart = () => {
    commerce.cart
      .empty()
      .then((resp) => {
        setCart(resp.cart);
      })
      .catch((error) => {
        console.error("There was an error emptying the cart", error);
      });
  };

  const refreshCart = () => {
    commerce.cart
      .refresh()
      .then((newCart) => {
        setCart(newCart);
      })
      .catch((error) => {
        console.log("There was an error refreshing your cart", error);
      });
  };

  const handleCaptureCheckout = (checkoutTokenId, newOrder) => {
    commerce.checkout
      .capture(checkoutTokenId, newOrder)
      .then((order) => {
        setOrder(order);

        refreshCart();

        //TODO navigate to confirmation page.

        window.sessionStorage.setItem("order_receipt", JSON.stringify(order));
      })
      .catch((error) => {
        console.log("There was an error confirming your order", error);
      });
  };

  const handleBackToHome = () => {};

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={
              <div className="flex h-screen bg-gradient-to-r from-yellow-500 via-purple-500 to-pink-500 ">
                <div className="flex flex-col">
                  <Header
                    cart={cart}
                    handleUpdateCartQty={handleUpdateCartQty}
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
            <Checkout cart={cart} onCaptureCheckout={handleCaptureCheckout} />
          }
        />
        <Route
          path="/confirmation"
          exact
          element={
            <Confirmation order={order} onBackToHome={handleBackToHome} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
