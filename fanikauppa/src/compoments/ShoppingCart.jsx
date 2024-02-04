import React from 'react';
import CheckoutForm from './CheckoutForm'; 
import { useNavigate } from 'react-router-dom';
import {SaleTable, SaleRow} from './saleTable';

const Saletablee = [
  {id: 1, kurssinimi: "100", opettaja: "2.5", luokka: "100 - 250"},
  {id: 2, kurssinimi: "250", opettaja: "4", luokka: "250 - 500"},
  {id: 3, kurssinimi: "500", opettaja: "10", luokka: "500 - "}

]



/*const deleteProduct = ({cart}) => {
  console.log("CALLED")
  const deleteProduct = cart.pop((id, item) => {item.id})
  return deleteProduct
} */


const ShoppingCart = ({ cart, setCart }) => {
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
  let discount = 0;
  if (totalPrice >= 500) {
    discount = 10;
  } else if (totalPrice >= 250) {
    discount = 4;
  } else if (totalPrice >= 100) {
    discount = 2.5;
  }
  const clearCart = () => {
    setCart([]);
  }

  const deleteProduct = (id) => {
    setCart((currentCart) => currentCart.filter((item) => item.id === id))
  }
  const discountedTotal = totalPrice - (totalPrice * discount / 100);

  const itemsList = cart.map((item, index) => {
    return (
    <div key={item.id} className='cart-item'>
      <img src={item.photo} alt={item.name} className='cart-item-image' />
      <div className='cart-item-details'>
        <h4>{item.name}</h4>
        <p>{item.description}</p>
        <p>Price per individual: {item.price.toFixed(2)} €</p>
        <p>Quantity: {item.quantity}</p>
        <p>subtotal: {(item.price * item.quantity).toFixed(2)} €</p>
        <button onClick={() => deleteProduct(item.id)} className='deleteButton'>Delete the product: {item.name}</button>
      </div>
    </div>
    );
    
  })
  
  let navigate = useNavigate()
  const handleNavigate = (path) => {
    return () => navigate(path);
  };
  return (
    
    <div>
      <h3>Shopping cart</h3>
      <div className='orderDetails'>
      {itemsList}
      </div>
      <p>Total Price: {discountedTotal.toFixed(2)} € ({discount}% sale currently, without sale: {totalPrice.toFixed(2)} €)</p>
      
      <CheckoutForm cart={cart} />
      <button type='submit' onClick={handleNavigate('/')} className='returnButton'>Return for shopping</button>
      <button type='submit' onClick={clearCart} className='DeleteButton'>Delete all the products</button>
      <SaleTable data={Saletablee} />
    </div>
  );
};

export default ShoppingCart;
