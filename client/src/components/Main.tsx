import React, { useEffect, useState } from 'react'
import bag from "../images/bag.png"
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'
import Loading from './Loading'
import { useAuth } from '../auth/auth';
import { v4 as uuidv4 } from 'uuid';
import { authserviceUserNotRegistred } from '../api';

export default function Main() {


    const navigate: NavigateFunction = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const { token } = useAuth()

    const generateHost = () => {
        const host = localStorage.setItem("host", uuidv4())
        return host;
    }



    const handleCheckout = () => {
        setLoading(true);
        setTimeout(() => {
            generateHost();
            if (token) {
                navigate("/user/info")
            } else {
                navigate("/login")
            }
            
            setLoading(false)
        }, 1000);
    }


    return (
        <div className='h-2/3 w-full bg-primary flex mt-[80px]'>
            <div className='h-full w-1/2 flex flex-col justify-center items-center gap-4 mt-[80px]'>
                <h1 className='text-secondary text-6xl '>Basi Bag</h1>
                <p className='text-secondary'> the perfect blend of style, functionality, and durability.</p>
                <p className='text-secondary mt-9 text-2xl'> $129</p>
                {loading ?
                    <button className='bg-secondary w-1/4 flex justify-center items-center h-[35px] mt-6 rounded-ss-[30px]'><Loading /></button> :
                    <button onClick={handleCheckout} className='bg-secondary w-1/4 flex justify-center items-center h-[35px] mt-6 rounded-ss-[30px]'>BUY NOW</button>
                }
            </div>
            <div className='h-full w-1/2 bg-secondary  relative  rounded-ss-full  flex justify-center items-center '>
                <img src={bag} className='mt-[200px]' />
            </div>
        </div>

    )
}
