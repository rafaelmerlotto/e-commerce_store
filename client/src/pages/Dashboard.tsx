import React from 'react'
import { useForm } from 'react-hook-form'

interface DataProduct {
    name: string
    price: string
}

export default function Dashboard() {
    const { register, handleSubmit } = useForm<DataProduct>()
    const onSubmit = (data: DataProduct) => {
        console.log(data)
        return data
    }
    return (
        <div className='w-full h-screen bg-primary flex flex-col justify-center items-center'>
            <form  className='w-1/2 flex flex-col justify-center items-center gap-9' onSubmit={handleSubmit(onSubmit)}>
                <input className='bg-primary border-2 border-secondary w-1/3 h-[35px]' type="text" {...register("name")} />
                <input className='bg-primary border-2 border-secondary w-1/3 h-[35px]' type="text" {...register("price")} />
                <button className='w-1/3 h-[35px] bg-text text-secondary mt-5 rounded' type='submit'>Create article</button>
            </form>
        </div>
    )
}
