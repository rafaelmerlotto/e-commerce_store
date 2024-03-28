import React from 'react'
import bag from "../images/bag.png"
import { Link } from 'react-router-dom'

export default function Main() {
    return (
        <div className='h-2/3 w-full bg-primary flex mt-[80px]'>
            <div className='h-full w-1/2 flex flex-col justify-center items-center gap-4 mt-[80px]'>
                <h1 className='text-secondary text-6xl '>Basi Bag</h1>
                <p className='text-secondary'> the perfect blend of style, functionality, and durability.</p>
                <p className='text-secondary mt-9 text-2xl'> $129</p>
                <Link to={"/checkout"} className='bg-secondary w-1/4 flex justify-center items-center h-[35px] mt-6 rounded-ss-[30px]'>BUY NOW</Link>
            </div>
            <div className='h-full w-1/2 bg-secondary  relative  rounded-ss-full  flex justify-center items-center '>
                <img src={bag}  className='mt-[200px]'/>
            </div>
        </div>

    )
}
