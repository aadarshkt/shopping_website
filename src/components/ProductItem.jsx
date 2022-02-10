import React, { Component } from "react";
import { stripHtml } from "string-strip-html";
import PropTypes from "prop-types";

const ProductItem = ({ product, onAddToCart }) => {
  const { result } = stripHtml(product.description);

  const handleAddToCart = () => {
    onAddToCart(product.id);
  };

  return (
    <div className="flex flex-col border-2 rounded-lg">
      <img
        src={product.image?.url}
        alt={product.name}
        className="w-full h-full"
      />
      <div className="flex flex-row pl-2">
        <h1 className="text-white font-medium font-poppins">{product.name}</h1>
        <span className="flex grow place-content-end pr-2">
          <p className="flex justify-end text-white font-medium font-poppins">
            {product.price.formatted_with_symbol}
          </p>
        </span>
      </div>
      <p className="text-white font-light font-poppins pl-2">{result}</p>
      <button
        name="add to cart"
        className="bg-white pt-2 pb-2 mt-4 mb-2 mr-2 ml-2 rounded-lg"
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object,
};

export default ProductItem;
