import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React from 'react'
import { PayPalPayments } from '../components/PayPalPayments';
import Header from '../components/Header';

export default function Checkout() {


    return (
     
          <div className='w-full h-screen bg-primary flex justify-center items-start'>
           <Header/>
           <div className='mt-[100px] w-2/3'>
            <PayPalPayments  />
           </div>
        </div>
    )
}
