import ProductImage from './ProductImage';
import products from './products';

function ProductsInList({ onAddToCart }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductImage key={product.id} {...product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}
export default ProductsInList;
