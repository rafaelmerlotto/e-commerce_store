import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React from 'react'
import { PayPalPayments } from '../components/PayPalPayments';
import Header from '../components/Header';

export default function Checkout() {


    return (
     
          <div className='w-full h-screen bg-primary flex justify-center items-start'>
           
          <PayPalPayments  />
         
          
        </div>
       
      

    )
}