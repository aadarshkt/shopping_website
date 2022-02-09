import React from "react";
import CartIcon from "../assets/CartIcon";
import CartNav from "./CartNav";

const Header = ({ cart, handleUpdateCartQty, onRemoveFromCart, onEmptyCart}) => {
  return (
    <div className="flex flex-row bg-gradient-to-r from-yellow-500 via-purple-500 to-pink-500 ">
      <div className="flex grow justify-center">
        <h1 className="flex font-extrabold font-poppins text-white text-6xl pt-6">
          IIT(ISM) Merchandise
        </h1>
      </div>
      <div className="flex justify-center items-center z-10">
        <CartNav
          cart={cart}
          onUpdateCartQty={handleUpdateCartQty}
          onRemoveFromCart={onRemoveFromCart}
          onEmptyCart={onEmptyCart}
        />
      </div>
    </div>
  );
};

export default Header;
