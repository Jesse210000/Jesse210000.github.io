import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import Logo from '../img/Logo1.png'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const CheckoutForm = ({ cart, onClearCart }) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
    orderID: Math.floor(Math.random(0, 1) * 10000000)
  });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };
  
  console.log("Cart:" + cart)

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const initialOptions = {
    "client-id": "AdC2KIPhKlu_imXCVWRh-Ocsox9TQEHoF-ejRpslx0S58f1vi982g5t8Pt1pesSjBVFJr8zriCsDyJT6",
    currency: "EUR", // or any other currency
    intent: "capture",
    
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: calculateTotal(), // Total amount to charge
        },
      }],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      // Call the function to generate and download the PDF receipt
      const generatePDF = (customerInfo, cartItems) => {
        const pdf = jsPDF();
        const pageWidthe = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const pageMargin = 20;
        let y = 0;
  
        const incrementY = (lines = 1) => {
          y += 6 * lines
        };
  
        pdf.addImage(Logo, 'JPEG', (pageWidthe / 2) - 40, y, 80, 40);
        incrementY(7)
  
        pdf.setFontSize(18);
        pdf.text(`COOKIE BITES`, pageMargin, y);
        incrementY(2)
  
        pdf.setFontSize(12);
        pdf.text('Thank you so much for your purchase! We truly apprechiate it!', pageMargin, y)
        incrementY(2)
        pdf.text('Below are your order details', pageMargin, y)
        incrementY(2)
  
        pdf.setDrawColor(0);
        pdf.line(pageMargin, y, pageWidthe - pageMargin, y)
        incrementY(2)
  
        incrementY(-20)
        pdf.text(`Order details: `, pageMargin, y)
        incrementY()
        pdf.text(`Order ID: ${customerInfo.orderID} `, pageMargin, y)
        incrementY()
        
        cartItems.forEach(item => {
          pdf.text(`Product Name: ${item.name}`, pageMargin, y);
          y += 10;
          pdf.text(`Price: ${item.price.toFixed(2)} €`, pageMargin, y);
          y += 10;
          pdf.text(`Quantity: ${item.quantity}`, pageMargin, y);
          y += 10;
          pdf.text(`Subtotal: ${(item.price * item.quantity).toFixed(2)} €`, pageMargin, y);
          y += 10;
          pdf.text('---------------------------------', pageMargin, y);
          y += 10;
        });
  
      
        
        
  
  
        pdf.save('Receipt.pdf')
      }
      generatePDF(customerInfo, cart);
      // Navigate to a success page or back to the store
      navigate('/');
      console.log('Payment approved:', details);
    });
  };

  /* const handleSubmit = (e) => {
    
    e.preventDefault();

    
    
    console.log('Order submitted', customerInfo, cart);

    const generatePDF = (customerInfo, cartItems) => {
      const pdf = jsPDF();
      const pageWidthe = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const pageMargin = 20;
      let y = 0;

      const incrementY = (lines = 1) => {
        y += 6 * lines
      };

      pdf.addImage(Logo, 'JPEG', (pageWidthe / 2) - 40, y, 80, 40);
      incrementY(7)

      pdf.setFontSize(18);
      pdf.text(`COOKIE BITES`, pageMargin, y);
      incrementY(2)

      pdf.setFontSize(12);
      pdf.text('Thank you so much for your purchase! We truly apprechiate it!', pageMargin, y)
      incrementY(2)
      pdf.text('Below are your and order details', pageMargin, y)
      incrementY(2)

      pdf.setDrawColor(0);
      pdf.line(pageMargin, y, pageWidthe - pageMargin, y)
      incrementY(2)

      pdf.text('Your personal information:', pageMargin, y)
      incrementY(2)

      pdf.text(`Name ${customerInfo.name}`, pageMargin, y);
      incrementY()
      pdf.text(`Email: ${customerInfo.email}`, pageMargin, y)
      incrementY()
      pdf.text(`Phone: ${customerInfo.phone}`, pageMargin, y);
      incrementY()
      pdf.text(`Address: ${customerInfo.address}`, pageMargin, y);
      incrementY()
      pdf.text(`Postal Code: ${customerInfo.postalCode}`, pageMargin, y);
      incrementY()
      pdf.text(`City:  ${customerInfo.city}`, pageMargin, y)
      incrementY()
      

      pdf.setDrawColor(0);
      pdf.line(pageMargin, y, pageWidthe - pageMargin, y)
      incrementY(2)
      pdf.addPage()
      incrementY(-20)
      pdf.text(`Order details: `, pageMargin, y)
      incrementY()
      pdf.text(`Order ID: ${customerInfo.orderID} `, pageMargin, y)
      incrementY()
      
      cartItems.forEach(item => {
        pdf.text(`Product Name: ${item.name}`, pageMargin, y);
        y += 10;
        pdf.text(`Price: ${item.price.toFixed(2)} €`, pageMargin, y);
        y += 10;
        pdf.text(`Quantity: ${item.quantity}`, pageMargin, y);
        y += 10;
        pdf.text(`Subtotal: ${(item.price * item.quantity).toFixed(2)} €`, pageMargin, y);
        y += 10;
        pdf.text('---------------------------------', pageMargin, y);
        y += 10;
      });

    
      
      


      pdf.save('Receipt.pdf')
    }

   
    

    
    generatePDF(customerInfo, cart)

    
    if (onClearCart) {
      onClearCart();
    }
    alert('Thank you for your purchase! A receipt of your order will be downloaded shortly. ');

    setCustomerInfo({
      name: '',
      email: '',
      phone: '',
      address: '',
      postalCode: '',
      city: ''
    });
    navigate('/');
  };
*/
  return (
    <PayPalScriptProvider options={initialOptions}>
    <form>
      <PayPalButtons 
          createOrder={createOrder} 
          onApprove={onApprove} 
        />
      
    </form>
    </PayPalScriptProvider>
  );
};

export default CheckoutForm;
