// src/Pages/Checkout/Checkout.js
import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Box, Button } from '@mui/material';
import CheckoutForm from './CheckoutForm';
import PaymentForm from './PaymentForm';
import OrderConfirmation from './OrderConfirmation';
import { useCart } from '../../context/CartContext';

const steps = ['Shipping Information', 'Payment Details', 'Order Confirmation'];

function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const { cart, clearCart } = useCart();
  const [orderData, setOrderData] = useState(null);

  const handleNext = (data) => {
    setOrderData(prev => ({ ...prev, ...data }));
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleCompleteOrder = async (paymentData) => {
    try {
      // Submit order to your backend
      // const response = await createOrder({ ...orderData, ...paymentData, items: cart });
      // console.log('Order created:', response.data);
      
      // Clear cart on successful order
      clearCart();
      handleNext({ orderId: '12345' }); // Mock order ID
    } catch (error) {
      console.error('Order submission error:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: '4rem auto', padding: '2rem' }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <CheckoutForm 
          initialValues={orderData} 
          onNext={handleNext} 
        />
      )}

      {activeStep === 1 && (
        <PaymentForm 
          initialValues={orderData} 
          onBack={handleBack}
          onNext={handleCompleteOrder}
        />
      )}

      {activeStep === 2 && orderData && (
        <OrderConfirmation 
          orderId={orderData.orderId} 
        />
      )}
    </Box>
  );
}

export default Checkout;