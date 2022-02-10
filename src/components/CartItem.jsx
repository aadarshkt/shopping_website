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
    <div className="flex flex-col justify-center items-center border-2 rounded-lg mb-4 bg-white">
      <img className="rounded-lg" src={item.image.url} alt={item.name} />
      <div className="flex flex-row w-full pl-2">
        <h4 className="grow text-black font-light">{item.name}</h4>
        <div className="text-black font-bold">
          <p className="text-white font-medium">{item.quantity}</p>
        </div>
      </div>
      <div className="flex flex-row w-full pl-2 pr-2 pb-2">
        <div className="flex grow text-black font-medium">
          {item.line_total.formatted_with_symbol}
        </div>
        <button
          type="button"
          className="flex text-black font-medium hover:text-red-500"
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
