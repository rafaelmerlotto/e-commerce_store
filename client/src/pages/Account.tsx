import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import User from '../components/User'

export default function Account() {
    return (
        <div className='bg-primary w-full h-screen'>
            <Header />
          <User/>
            <Footer />
        </div>
    )
}
