import React from 'react'
import { useForm } from 'react-hook-form'
import Header from '../components/Header'
import { authserviceUserNotRegistred } from '../api'
import { v4 as uuidv4 } from 'uuid';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export interface DataUserNotRegistred {
    requestId: string
    email: string
    name: string
    surname: string
    country: string
    postCode: string
    stateProvince: string
    city: string
    address: string
    tel: string
}

export default function FormNotRegistred() {

    const { handleSubmit, register } = useForm<DataUserNotRegistred>();
    const navigate: NavigateFunction = useNavigate();




    const onSubmit = async (data: DataUserNotRegistred) => {
        const res = await authserviceUserNotRegistred.registerForPayment
            (data.requestId, data.email, data.name, data.surname, data.country, data.postCode, data.stateProvince, data.city, data.address, data.tel)
        if (res) { 
           
            navigate("/checkout")
        }
    }


    return (
        <div className='bg-primary w-full h-screen flex flex-col items-center '>
            <Header />
            <h1 className='text-secondary text-start w-2/4 text-3xl mt-[150px] mb-[40px]'>Shipping address</h1>
            <form onSubmit={handleSubmit(onSubmit)} className=' w-2/4 h-full flex flex-wrap gap-5'>
                <input type="text"{...register("requestId")} value={localStorage.getItem("host")!} placeholder='Email' hidden className='w-2/3 h-[35px] rounded' />
                <input type="text"{...register("email", { required: true })} placeholder='Email *' className='w-2/3 h-[35px] rounded' />
                <input type="text"{...register("name", { required: true })} placeholder='Name *' className='w-2/5 h-[35px] rounded' />
                <input type="text"{...register("surname", { required: true })} placeholder='Surname *' className='w-2/5 h-[35px] rounded' />
                <input type="text"{...register("country", { required: true })} placeholder='Country *' className='w-2/5 h-[35px] rounded' />
                <input type="text"{...register("postCode", { required: true })} placeholder='Post code *' className='w-2/5 h-[35px] rounded' />
                <input type="text"{...register("stateProvince")} placeholder='State/Province' className='w-2/5 h-[35px] rounded' />
                <input type="text"{...register("city", { required: true })} placeholder='City *' className='w-2/5 h-[35px] rounded' />
                <input type="text"{...register("address", { required: true })} placeholder='Address *' className='w-2/3 h-[35px] rounded' />
                <input type="text"{...register("tel", { required: true })} placeholder='Tel number *' className='w-3/6 h-[35px] rounded' />
                <button className='bg-secondary w-2/4 flex justify-center items-center h-[35px] mt-6 mb-8 rounded-ss-[30px]'>Confirm</button>
            </form>
            {/* <Footer/> */}
        </div>
    )
}
