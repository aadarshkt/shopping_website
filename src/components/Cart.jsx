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
      <p className="cart__none">
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
    <div className="overflow-auto">
      <h4 className="text-white font-medium">Your Shopping Cart</h4>
      {renderEmptyMessage()}
      {renderItems()}
      {renderTotal()}
      <div className="cart__footer">
        <button className="cart__btn-empty" onClick={handleEmptyCart}>
          Empty cart
        </button>
        <Link className="text-white font-medium" to="/checkout">
          Checkout
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
