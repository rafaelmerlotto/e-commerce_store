import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import IntagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
    return (
        <div className='h-2/3 w-full bg-primary flex'>
            <div className='h-full w-1/2 flex flex-col justify-end items-end gap-4'>
                <div className="flex justify-center items-center gap-3">
                    <FacebookIcon className='text-secondary' fontSize='large'/>
                    <IntagramIcon className='text-secondary' fontSize='large' />
                </div>

                <p className='text-secondary text-sm pb-2'>Basi Bag © </p>
            </div>
            <div className='h-full w-1/2 bg-secondary  relative   rounded-es-full flex justify-center items-center'>

            </div>
        </div>

    )
}
