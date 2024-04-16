import React, { useEffect, useState } from 'react'
import { useAuth } from '../auth/auth';
import { useForm } from 'react-hook-form';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import Header from '../components/Header';


interface LoginData {
    email: string;
    password: string;
}


export default function Login() {

    const navigate: NavigateFunction = useNavigate()
    const { login, token } = useAuth();
    const { handleSubmit, register } = useForm<LoginData>();
    const [verifyHost, setVerifyHost] = useState<any>(localStorage.getItem("host"))

    const onSubmit = async (data: LoginData) => {
        const res = await login(data.email, data.password)
        return res
    };

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token)
            return navigate("/")
        }
    }, [token, verifyHost])


    const handleNavigate = () => {
        if (verifyHost) {
            return navigate("/info")
        }
    }




    return (
        <div className=' flex flex-col justify-center items-center '>
            <Header />
            <form onSubmit={handleSubmit(onSubmit)} className='h-[400px] w-[300px] bg-secondary flex flex-col justify-center items-center gap-5 mt-[100px] rounded-ss-[60px]'>
                <p className='text-secondary bg-black p-2 rounded-ss-[30px]'>Basi Bag</p>
                <input type="email" {...register("email", {required:true})}  placeholder=' Email' className='w-[80%] h-[40px] bg-primary rounded text-secondary text-sm' />
                <input type="password" {...register("password", {required:true})} placeholder=' Password' className='w-[80%] h-[40px] bg-primary rounded text-secondary text-sm' />
                <button className='text-green-500' type='submit'>Log in</button>
                {verifyHost ? <button className='text-black-500' onClick={handleNavigate}>Continue without login</button> : ""}

                <p className='text-sm mt-8'> Not registed? <button onClick={() => navigate("/register")} className='text-[16px] text-blue-500' type='submit'>Sign in</button></p>

            </form>

        </div>

    )
}
