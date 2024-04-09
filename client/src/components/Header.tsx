import React, { useState } from 'react'
import logo from "../images/logo-store.png"
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/auth'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Loading from './Loading';



export default function Header() {

    const { token, logout } = useAuth();
    const navigate: NavigateFunction = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [host, setHost] = useState<boolean>(false);


    const handleLogout = () => {
        setLoading(true)
        setTimeout(() => {
            logout();
            localStorage.removeItem("token")
            navigate("/")
            setLoading(false)
        }, 1200);
    }

    const setStorage = () => {
        localStorage.removeItem("host")
    }

    return (
        <div className='w-full h-[80px] bg-secondary flex fixed top-0 mb-7 z-20 border-b-2 border-primary'>
            <div className='w-[50%] h-full flex items-center justify-center'>
                <p className='text-secondary bg-black p-2 rounded-ss-[30px]'>Basi Bag</p>
            </div>
            <div className='w-1/2 h-full flex justify-center items-center gap-9 '>
                <Link className='text-primary' to={'/'}>HOME</Link>
                <Link className='text-primary' to={''}>THE BAG</Link>
                {token ?
                    <>
                    <Link className='text-primary' to={''}>ACCOUNT</Link>
                        <p className='text-primary ml-8 text-[14px]' ><AccountCircleIcon /> Rafael</p>
                        
                       { loading? <Loading /> :  <Link onClick={handleLogout} className='text-red-500 ml-8 text-[14px]' to={'/'}>LOGOUT</Link>}
                    </>
                    :        
                    <Link className='text-green-500 text-[14px] ml-[150px]' onClick={setStorage} to={'/login'}>LOG IN</Link>
                }

            </div>
        </div>
    )
}
