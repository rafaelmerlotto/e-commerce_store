import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React, { ReactNode, useEffect, useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { DataUserNotRegistred } from '../pages/FormNotRegistred';
import { authserviceUserNotRegistred, authserviceUserRegistred } from '../api';
import { DataUserRegistred } from '../pages/FormRegistred';
import { useAuth } from '../auth/auth';

export const PayPalPayments = () => {

    const url: string = "http://localhost:4000/payment"
    const [payer, setPayer] = useState<any>()
    const [payment, setPayment] = useState<any>()
    const [status, setStatus] = useState<any>()
    const [amount, setAmount] = useState<any>()
    const [shipping, setShipping] = useState<any>()
    const [shippingRegistred, setShippingRegistred] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)
    const { token } = useAuth();

    const createOrder = async (data: any, actions: any) => {
        const response = await fetch(`${url}/api/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                product: {
                    description: "the perfect blend of style, functionality, and durability.",
                    cost: "129.00"
                }
            }),
        });
        const order = await response.json();
        return order.id;
    }

    const onApprove = async (data: any, actions: any) => {


        const res = await fetch(`${url}/api/orders/${data.orderID}/capture`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderID: data.orderID
            })
        })

        if (res.ok) {
            const data: any = await res.json();
            console.log(data)
            setPayer(data.purchase_units[0].shipping.name)
            setPayment(data.purchase_units[0].payments.captures[0])
            setAmount(data.purchase_units[0].payments.captures[0].amount)
            setStatus(data)
            setLoading(true)
        }

    }

    const getShipping = async () => {
        const res = await authserviceUserNotRegistred.getUserForPayment(localStorage.getItem("host")!);
        setShipping(res)
    }
    const getShippingRegistred = async () => {
        const res = await authserviceUserRegistred.getUserForPayment();
        setShippingRegistred(res)
    }


    useEffect(() => {
        getShipping();
        getShippingRegistred()
    }, [])

    return (
        <div className='h-full w-full bg-primary flex  justify-center items-start mt-7'>

            <PayPalScriptProvider options={{ clientId: "AfZf3RvxGcuNnw-Uo16qj3_kyBI0HRKxGM2Rg0FTzW3iMLgEu-CuaNhMVXHf4UMu8eeainvI7gxOjB5M", currency: "USD", intent: "capture", }}>
                {loading ?
                    <div className=' bg-secondary w-full h-2/3 rounded'>
                        <div className='p-3'>
                            <Link to={"/"}><ArrowBackIcon /></Link>
                        </div>
                        <div className='w-full flex flex-col justify-center items-center mt-4'>
                            <CheckCircleIcon className='text-green-500 ' fontSize='large' />
                            <p>Payment successfully!</p>
                        </div>
                        <div className="w-full flex items-center justify-center">
                              <Succesfully full_name={payer.full_name} create_time={payment.create_time} amount={amount.value} id={payment.id} status={status.status} currency_code={amount.currency_code} />
                        {token ? <ShippingRegistred requestId={shippingRegistred.requestId} email={shippingRegistred.email} name={shippingRegistred.name} surname={shippingRegistred.surname} country={shippingRegistred.country}
                            postCode={shippingRegistred.postCode} stateProvince={shippingRegistred.stateProvince} city={shippingRegistred.city} address={shippingRegistred.address} tel={shippingRegistred.tel} /> :
                            <Shipping requestId={shipping.requestId} email={shipping.email} name={shipping.name} surname={shipping.surname} country={shipping.country}
                                postCode={shipping.postCode} stateProvince={shipping.stateProvince} city={shipping.city} address={shipping.address} tel={shipping.tel} />
                        }
                        </div>
                      
                        <div className=' w-full flex justify-center items-center'>
                            <p className='text-secondary text-xs bg-black w-[65px] h-[32px] p-2 rounded-ss-[30px] mb-2'>Basi Bag</p>
                        </div>

                    </div>
                    :
                    <>
                        <PayPalButtons
                            className='rounded bg-primary w-2/4'
                            createOrder={(data, actions) => createOrder(data, actions)}
                            onApprove={(data, actions) => onApprove(data, actions)}
                        />
                    </>
                }
            </PayPalScriptProvider>
            {/* <Link to={"/"}><ArrowBackIcon className='text-secondary m-9-' /></Link> */}
        </div>
    )
}

interface DataUser {
    // surname: string;
    full_name: string
    create_time: string
    amount: string
    id: string
    status: string
    currency_code: string
}

const Succesfully = (props: DataUser) => {
    const { full_name, id, create_time, amount, status, currency_code } = props;

    const currencyFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency_code
    })

    return (
        <div className='w-1/2 flex flex-col justify-center items-start mt-9 p-9 gap-4' >
            <p className='text-sm flex'>Ref number: <p className='font-bold ml-2'> {id} </p></p>
            <p className='text-sm flex'>Sender name: <p className='font-bold ml-2'> {full_name} </p></p>
            <p className='text-sm flex'>Payment time: <p className='font-bold ml-2'> {create_time} </p></p>
            <p className='text-sm flex'>Amount: <p className='font-bold ml-2'>{currencyFormat.format(Number(amount))} </p></p>
            <p className='text-sm flex'>Status: <p className='font-bold ml-2'>{status} </p></p>
        </div>

    )
}


const Shipping = (shippingProps: DataUserNotRegistred) => {
    const { email, name, surname, country, postCode, stateProvince, city, address, tel } = shippingProps
    return (
        <div className='bg-secondary w-1/2 flex flex-col justify-center items-start mt-9 p-9 gap-4'>
        <h1 className='text-primary text-start text-xl '>Ship to:</h1>

    <div className='flex gap-5 '>
                <p className='text-primary flex text-sm'>Email: <p className='font-bold ml-2'>{email} </p></p>
                <p className='text-primary flex text-sm'>Tel: <p className='font-bold ml-2'>{tel} </p></p>
            </div>
            <div className='flex gap-5 '>
                <p className='text-primary flex text-sm'>Name: <p className='font-bold ml-2'>{name} </p></p>
                <p className='text-primary flex text-sm'>Surname: <p className='font-bold ml-2'>{surname} </p></p>
            </div>
            <div className='flex  gap-5 '>
                <p className='text-primary flex text-sm'>Address: <p className='font-bold ml-2'>{address} </p></p>
            </div>
            <div className='flex  gap-5'>
                <p className='text-primary flex text-sm'>City: <p className='font-bold ml-2'>{city} </p></p>
                <p className='text-primary flex text-sm'>Post code: <p className='font-bold ml-2'>{postCode} </p></p>
            </div>
            <div className='flex  gap-5'>
                <p className='text-primary flex text-sm'>State/Province: <p className='font-bold ml-2'>{stateProvince} </p></p>
                <p className='text-primary flex text-sm'>Country: <p className='font-bold ml-2'>{country} </p></p>
            </div>
</div>

    )
}

const ShippingRegistred = (shippingProps: DataUserRegistred) => {
    const { email, name, surname, country, postCode, stateProvince, city, address, tel } = shippingProps
    return (
        <div className='bg-secondary w-1/2 flex flex-col justify-center items-start mt-9 p-9 gap-4'>
                <h1 className='text-primary text-start text-xl '>Ship to:</h1>

            <div className='flex gap-5 '>
                        <p className='text-primary flex text-sm'>Email: <p className='font-bold ml-2'>{email} </p></p>
                        <p className='text-primary flex text-sm'>Tel: <p className='font-bold ml-2'>{tel} </p></p>
                    </div>
                    <div className='flex gap-5 '>
                        <p className='text-primary flex text-sm'>Name: <p className='font-bold ml-2'>{name} </p></p>
                        <p className='text-primary flex text-sm'>Surname: <p className='font-bold ml-2'>{surname} </p></p>
                    </div>
                    <div className='flex  gap-5 '>
                        <p className='text-primary flex text-sm'>Address: <p className='font-bold ml-2'>{address} </p></p>
                    </div>
                    <div className='flex  gap-5'>
                        <p className='text-primary flex text-sm'>City: <p className='font-bold ml-2'>{city} </p></p>
                        <p className='text-primary flex text-sm'>Post code: <p className='font-bold ml-2'>{postCode} </p></p>
                    </div>
                    <div className='flex  gap-5'>
                        <p className='text-primary flex text-sm'>State/Province: <p className='font-bold ml-2'>{stateProvince} </p></p>
                        <p className='text-primary flex text-sm'>Country: <p className='font-bold ml-2'>{country} </p></p>
                    </div>
        </div>

    )
}