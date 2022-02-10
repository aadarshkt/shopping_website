import React, { Component } from "react";
import CartItem from "./CartItem";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
  const handleEmptyCart = () => {
    onEmptyCart();
  };

  const renderEmptyMessage = () => {
    if (cart.total_unique_items > 0) {
      return;
    }
    return (
      <p className="font-poppins font-light text-white pt-5 pb-5">
        You have no items in your shopping cart, start adding some!
      </p>
    );
  };

  const renderItems = () =>
    cart.line_items.map((lineItem) => (
      <CartItem
        item={lineItem}
        key={lineItem.id}
        onUpdateCartQty={onUpdateCartQty}
        onRemoveFromCart={onRemoveFromCart}
        onEmptyCart={onEmptyCart}
        className=""
      />
    ));

  const renderTotal = () => (
    <div className="cart__total">
      <p className="text-white font-medium">Subtotal:</p>
      <p className="text-white font-medium">
        {cart.subtotal.formatted_with_symbol}
      </p>
    </div>
  );

  return (
    <div>
      {renderEmptyMessage()}
      {renderItems()}
      {renderTotal()}
      <div className="">
        <button
          className="font-poppins mt-5 ml-8 mr-8 bg-white hover:bg-gray-300 text-black font-light py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleEmptyCart}
        >
          Empty cart
        </button>
        <Link className="text-white font-medium" to="/checkout">
          <button className="font-poppins mt-5 ml-8 mr-8 bg-white hover:bg-gray-300 text-black font-light  py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.object,
  onEmptyCart: () => {},
};

export default Cart;
