import React from 'react'
import imgProduct from "../images/nike-air.png"

export default function Product() {
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='w-1/3 h-2/3 bg-secondary rounded flex flex-col items-center justify-center'>
                <p className='text-primary'>Shoes Nike Air Jordan 1 Mid LIGHT SMOKE GREY</p>
                <img src={imgProduct} alt="" className='w-1/2 h-1/2' />
                <p className='text-primary text-3xl font-bold '>209,00 €</p>
                <button className='w-2/3 h-[35px] bg-text text-secondary mt-5 rounded'> Add to Cart</button>
            </div>
        </div>
    )
}
