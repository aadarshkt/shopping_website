import React from "react";
import PropTypes from "prop-types";

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
  const handleUpdateCartQty = (lineItemId, quantity) => {
    onUpdateCartQty(lineItemId, quantity);
  };

  const handleRemoveFromCart = () => {
    onRemoveFromCart(item.id);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <img className="rounded-lg" src={item.image.url} alt={item.name} />
      <div className="flex flex-row">
        <h4 className="text-white font-light">{item.name}</h4>
        <div className="text-white font-light">
          <p className="text-white font-medium">{item.quantity}</p>
        </div>
      </div>
      <div className="flex flex-row w-full">
        <div className="text-white font-medium">
          {item.line_total.formatted_with_symbol}
        </div>
        <button
          type="button"
          className="text-white font-light"
          onClick={handleRemoveFromCart}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
};

export default CartItem;
