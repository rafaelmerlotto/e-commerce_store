import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { authservice } from '../api';


export interface RegisterData {
    fullName: string
    email: string;
    password: string;
}


export default function Register() {

    const navigate: NavigateFunction = useNavigate()
    const { handleSubmit, register } = useForm<RegisterData>();

    const onSubmit = async (data: RegisterData) => {
        const res = await authservice.register( data.fullName, data.email, data.password)
        if (res) {
            navigate("/login")
        }
        return res
    };




    return (
        <div className=' flex flex-col justify-center items-center '>
            <Header />
            <form onSubmit={handleSubmit(onSubmit)} className='h-[400px] w-[300px] bg-secondary flex flex-col justify-center items-center gap-5 mt-[100px] rounded-ss-[60px]'>
                <p className='text-secondary bg-black p-2 rounded-ss-[30px]'>Basi Bag</p>
                <input type="email" {...register("email", {required:true})} placeholder=' Email' className='w-[80%] h-[40px] bg-primary rounded text-secondary text-sm' />
                <input type="password" {...register("password", {required:true} )} placeholder=' Password' className='w-[80%] h-[40px] bg-primary rounded text-secondary text-sm' />
                <input type="text" {...register("fullName" , {required:true})} placeholder=' Full name' className='w-[80%] h-[40px] bg-primary rounded text-secondary text-sm' />
                <button className='text-blue-500' type='submit'>Sign in</button>
                <p className='text-sm mt-8'> Already have an account? <Link to={"/login"} className='text-[16px] text-green-500' >Log in</Link></p>
            </form>

        </div>

    )
}
