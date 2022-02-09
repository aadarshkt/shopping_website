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
    <div>
      <button>
        <CartIcon />
        {cart !== null ? (
          <p className="text-white z-10 fixed">{cart.total_items}</p>
        ) : (
          ""
        )}
      </button>
    </div>
  );

  const renderCloseButton = () => (
    <button className="nav__cart-btn--close">
      <CloseIcon />
    </button>
  );

  return (
    <div className="fixed h-screen right-0 top-0 overflow-y-auto p-5 glassmorphism">
      <div className="nav__cart" onClick={() => setCartVisible(!isCartVisible)}>
        {!isCartVisible ? renderOpenButton() : renderCloseButton()}
      </div>
      <div>
        <div className="">
          {isCartVisible && (
            <Cart
              cart={cart}
              onUpdateCartQty={handleUpdateCartQty}
              onRemoveFromCart={onRemoveFromCart}
              onEmptyCart={onEmptyCart}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CartNav;
