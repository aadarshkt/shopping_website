import React, { useState } from "react";
import CartIcon from "../assets/CartIcon";
import CloseIcon from "../assets/CloseIcon";
import Cart from "./Cart";

const CartNav = ({
  cart,
  handleUpdateCartQty,
  onRemoveFromCart,
  onEmptyCart,
}) => {
  const [isCartVisible, setCartVisible] = useState(false);

  const renderOpenButton = () => (
    <div className="fixed right-1 top-1 glassmorphism p-3">
      <button>
        {cart !== null ? (
          <p className="absolute bg-red-500 p-1 rounded-full right-2 top-0 text-white text-xs">
            {cart.total_items}
          </p>
        ) : (
          ""
        )}
        <CartIcon />
      </button>
    </div>
  );

  const renderCloseButton = () => (
    <div className="flex flex-row w-full mb-3">
      <button>
        <CloseIcon />
      </button>
      <div className="flex grow justify-center">
        <h4 className="text-white font-medium">Your Shopping Cart</h4>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col">
      <div className="" onClick={() => setCartVisible(!isCartVisible)}>
        {!isCartVisible ? renderOpenButton() : false}
      </div>
      {isCartVisible && (
        <div className="fixed h-screen right-0 top-0 overflow-y-auto glassmorphism p-5 w-1/3">
          <div onClick={() => setCartVisible(!isCartVisible)}>
            {renderCloseButton()}
          </div>

          <Cart
            cart={cart}
            onUpdateCartQty={handleUpdateCartQty}
            onRemoveFromCart={onRemoveFromCart}
            onEmptyCart={onEmptyCart}
          />
        </div>
      )}
    </div>
  );
};

export default CartNav;
