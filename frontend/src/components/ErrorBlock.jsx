import React from 'react'

export default function ErrorBlock({ error }) {
    console.log(error);
    
    return (
        <div className='w-[500px] mx-auto mt-10'>
            <h2 className='w-[100%] bg-red-800 px-2 py-2 rounded-t-md text-lg font-bold text-white'>
                Error
            </h2>
            <div className="bg-gray-950 text-white px-2 py-5">
                {error.message}
            </div>
        </div>
    )
}
