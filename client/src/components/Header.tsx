import React from 'react'
import logo from "../images/logo-store.png"
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div className='w-full h-[80px] bg-secondary flex fixed top-0 mb-7 z-20'>
            <div className='w-[40%] h-full flex items-center justify-center'>
                <p className='text-secondary bg-black p-2 rounded-ss-[30px]'>Basi Bag</p>
            </div>
            <div className='w-1/2 h-full flex justify-center items-center gap-9 '>
                <Link className='text-primary' to={'/'}>HOME</Link>
                <Link className='text-primary' to={''}>THE BAG</Link>
                <Link className='text-primary' to={''}>CONTACT</Link>
            </div>
        </div>
    )
}
