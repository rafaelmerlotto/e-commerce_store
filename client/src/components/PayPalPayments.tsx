import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React, { ReactNode, useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

export const PayPalPayments = () => {

    const url: string = "http://localhost:4000/payment"
    const [payer, setPayer] = useState<any>()
    const [payment, setPayment] = useState<any>()
    const [status, setStatus] = useState<any>()
    const [amount, setAmount] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)

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
            const data = await res.json();
            console.log(data)
            setPayer(data.purchase_units[0].shipping.name)
            setPayment(data.purchase_units[0].payments.captures[0])
            setAmount(data.purchase_units[0].payments.captures[0].amount)
            setStatus(data)
            setLoading(true)
        }

    }

 console.log(amount)

    return (
        <div className='h-full w-full bg-primary flex justify-center items-start mt-7'>

            <PayPalScriptProvider options={{ clientId: "AfZf3RvxGcuNnw-Uo16qj3_kyBI0HRKxGM2Rg0FTzW3iMLgEu-CuaNhMVXHf4UMu8eeainvI7gxOjB5M", currency: "USD", intent: "capture", }}>
                {loading ? <Succesfully full_name={payer.full_name} create_time={payment.create_time} amount={amount.value} id={payment.id} status={status.status} currency_code={amount.currency_code} /> :
                    <PayPalButtons
                        className='rounded bg-primary w-2/4'
                        createOrder={(data, actions) => createOrder(data, actions)}
                        onApprove={(data, actions) => onApprove(data, actions)}
                    />
                }


            </PayPalScriptProvider>

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
        <div className=' bg-secondary w-2/6 h-2/3 rounded'>
            <div className='p-3'>
                <Link to={"/"}><ArrowBackIcon /></Link>
            </div>
            <div className='w-full flex flex-col justify-center items-center mt-4'>
                <CheckCircleIcon className='text-green-500 ' fontSize='large' />
                <p>Payment successfully!</p>
            </div>
            <div className='w-full flex flex-col justify-center items-start mt-9 p-9 gap-4' >
                <p className='text-sm flex'>Ref number: <p className='font-bold ml-4'> {id} </p></p>
                <p className='text-sm flex'>Sender name: <p className='font-bold ml-4'> {full_name} </p></p>
                <p className='text-sm flex'>Payment time: <p className='font-bold ml-4'> {create_time} </p></p>
                <p className='text-sm flex'>Amount: <p className='font-bold ml-4'>{currencyFormat.format(Number(amount))} </p></p>
                <p className='text-sm flex'>Status: <p className='font-bold ml-4'>{status} </p></p>
            </div>
            <div className=' w-full flex justify-center items-center'>
                <p className='text-secondary text-xs bg-black w-[65px] h-[32px] p-2 rounded-ss-[30px]'>Basi Bag</p>
            </div>


        </div>

    )
}
