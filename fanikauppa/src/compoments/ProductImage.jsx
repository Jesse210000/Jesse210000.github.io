import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductImage({ name, photo, description, price, id, onAddToCart }) {
  let navigate = useNavigate();
  const [amount, setAmount] = useState(1);

  const showMoreInfo = () => {
    navigate(`/product/${id}`);
  };

  const buyProduct = () => {
    const quantity = Math.max(1, amount);
    console.log('Adding to cart:', { name, photo, description, price, id, quantity });
    onAddToCart({ name, photo, description, price, id, quantity });
    navigate('/cart');
  };
  

  const handleAmountChange = (e) => {
    const newAmount = Number(e.target.value);
    setAmount(newAmount > 0 ? newAmount : 1);
    console.log('Amount changed:', newAmount);
  };
  

  return (
    <div className="product-image">
      <h2>{name}</h2>
      <img src={photo} alt={name} />
      <h3>{description}</h3>
      <h1>{price.toFixed(2)} €</h1>
      <p>ID: {id}</p>
      <input
        type="number"
        name="number"
        id="number"
        value={amount}
        onChange={handleAmountChange}
        min="1" 
        placeholder='Amount'
      />
      <button onClick={buyProduct}>Buy</button>
      <button onClick={showMoreInfo}>More information</button>
    </div>
  );
}

export default ProductImage;
