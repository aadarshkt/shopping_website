import React from 'react';
import PropTypes from 'prop-types';
import ProductItem from './ProductItem';


const ProductsList = ({ products, onAddCart}) => {

    return (
        <div className="grid grid-cols-4 gap-16 p-12 justify-center items-center bg-gradient-to-r from-yellow-500 via-purple-500 to-pink-500 " id="products" >
            { products.map((product) => (
                <ProductItem
                    key={product.id}
                    product={product}
                    onAddToCart={onAddCart}
                />
            ))}
        </div>
    );
};

ProductsList.propTypes = {
    products: PropTypes.array,
};

export default ProductsList;