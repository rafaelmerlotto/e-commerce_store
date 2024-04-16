import React from 'react'
import bag from "../images/bag.png"


export default function Product() {
    return (
      
         <div className='h-2/3 w-full bg-primary flex mt-[80px]'>
            <div className='h-full w-1/2 flex flex-col justify-center items-center gap-4 mt-[80px] p-8'>
                <h1 className='text-secondary text-start text-6xl p-7'>About</h1>
                <p className='text-secondary text-sm p-7'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                 Quisque ut est efficitur, tristique diam a, ultricies nibh. Curabitur enim ligula, consectetur ac mi a,
                  placerat laoreet diam. Aenean lobortis rhoncus elementum. Nullam nec nisi eros. Quisque congue arcu urna. <br/><br/>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec enim nunc, pharetra a dignissim eget, tempor nec libero. 
                  Donec fringilla lorem non tellus gravida congue. Nunc ut urna vestibulum, fermentum eros vel, tincidunt nunc. Mauris commodo tortor ex, at vehicula lacus congue in.
                  ictum id vel lacus. Nam tincidunt risus non leo scelerisque luctus. Pellentesque vitae volutpat elit.
                   arius posuere ligula nec, viverra volutpat ex. Vestibulum placerat sapien vel enim blandit laoreet.<br/><br/> 
                   Morbi dapibus lacus id orci semper, nec elementum lorem egestas. Proin ullamcorper arcu sed lacinia commodo. Nullam 
                   hendrerit eu arcu at mollis. Etiam suscipit, lacus vel placerat scelerisque, arcu velit faucibus nisl, sit amet suscipit elit felis lobortis ipsum. Mauris at dapibus nulla.

            </p>
            
            </div>
            <div className='h-full w-1/2 bg-secondary  relative  rounded-ss-full  flex justify-center items-center '>
                <img src={bag} className='mt-[200px]' />
            </div>
           
        </div>
       
      
       
    )
}
