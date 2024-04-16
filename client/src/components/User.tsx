import React, { useEffect, useState } from 'react'
import bag from "../images/bag.png"
import { authservice, authserviceUserRegistred } from '../api';
import { DataUserRegistred } from '../pages/FormRegistred';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { RegisterData } from '../pages/Register';

export default function User() {

    const [shipping, setShipping] = useState<DataUserRegistred | null>()
    const [userInfo, setUserInfo] = useState<RegisterData | null >()


    const getShipping = async (): Promise<DataUserRegistred | null> => {
        const res = await authserviceUserRegistred.getUserForPayment();
        if (res) {
            setShipping(res)
        }
        return null
    }
    const getInfoUser = async (): Promise<RegisterData | null > => {
        const res = authservice.infoUser();
      if(res){
        setUserInfo(await res)
      }
        return null
    }

    useEffect(() => {
        getShipping();
        getInfoUser();
    }, [])

    return (

        <div className='h-2/3 w-full bg-primary flex mt-[80px]'>
            <div className='h-full w-1/2 flex flex-col justify-center items-center gap-4 mt-[80px] p-8'>
                <h1 className='text-secondary text-start text-2xl p-7'>Shipping information</h1>
                <div className=' flex flex-col justify-center '>


                    <div className='flex gap-10 m-2'>
                        <p className='text-secondary flex text-sm'>Email: <p className='ml-3'>{shipping?.email} </p></p>
                        <p className='text-secondary flex text-sm'>Tel: <p className='ml-3'>{shipping?.tel} </p></p>
                    </div>
                    <div className='flex gap-10 m-2'>
                        <p className='text-secondary flex text-sm'>Name: <p className='ml-3'>{shipping?.name} </p></p>
                        <p className='text-secondary flex text-sm'>Surname: <p className='ml-3'>{shipping?.surname} </p></p>
                    </div>
                    <div className='flex  gap-10 m-2'>
                        <p className='text-secondary flex text-sm'>Address: <p className='ml-3'>{shipping?.address} </p></p>
                    </div>
                    <div className='flex  gap-10 m-2'>
                        <p className='text-secondary flex text-sm'>City: <p className='ml-3'>{shipping?.city} </p></p>
                        <p className='text-secondary flex text-sm'>Post code: <p className='ml-3'>{shipping?.postCode} </p></p>
                    </div>
                    <div className='flex  gap-10 m-2'>
                        <p className='text-secondary flex text-sm'>State/Province: <p className='ml-3'>{shipping?.stateProvince} </p></p>
                        <p className='text-secondary flex text-sm'>Country: <p className='ml-3'>{shipping?.country} </p></p>
                    </div>
                    <button className='bg-secondary w-2/5 flex justify-center items-center h-[30px] mt-8  rounded-ss-[30px]'>Change</button>
                </div>

            </div>
            <div className='h-full w-1/2 bg-secondary  relative  rounded-ss-full  flex flex-col gap-5  justify-center items-center '>
            <h1 className='text-primary text-start text-2xl p-7'>Account</h1>
                <AccountCircleIcon fontSize='large'/>
                <p className='text-primary flex text-sm'>Email: <p className='ml-3'>{userInfo?.email} </p></p>
                <p className='text-primary flex text-sm'>Full name: <p className='ml-3'>{userInfo?.fullName} </p></p>
            </div>

        </div>



    )
}
