import React from 'react'
import Header from '../components/Header'
import Product from '../components/Product'
import Footer from '../components/Footer'

export default function TheBag() {
    return (
        <div className='bg-primary w-full h-screen'>
            <Header />
            <Product />
            <Footer />
        </div>
    )
}
