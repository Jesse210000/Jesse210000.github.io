import React from 'react';
import { useParams } from 'react-router-dom';
import products from './products';

const ProductDetail = ({ onAddToCart }) => {
  const { productId } = useParams();
  const product = products.find(p => p.id.toString() === productId);

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <div>
      {product ? (
        <div>
          <h2>{product.name}</h2>
          <img src={product.photo} alt={product.name} />
          <p>{product.description}</p>
          <h3>{product.price.toFixed(2)} €</h3>
          <button onClick={handleAddToCart}>Add to the cart</button>
        </div>
      ) : (
        <p>Product not found!</p>
      )}
    </div>
  );
};

export default ProductDetail;
