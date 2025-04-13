import React from 'react'
import useTheme from '../store/theme-mode'
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../services/products';
import ErrorBlock from '../components/common/ErrorBlock';

export default function RegisterProduct() {
    const { lightMode } = useTheme((state) => state);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const queryClient = useQueryClient();
    const newProduct = useMutation({
        mutationFn: (data) => createProduct(data),
        onSuccess: () => {
            queryClient.invalidateQueries('products')
            return reset();
        }
    })

    function onSubmit(data) {
        newProduct.mutate(data);
    }

    return (
        <>
            <h1 className={`${lightMode ? "text-gray-900" : "text-white"} font-bold text-3xl text-center transition-colors`}>Create New Product</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={`${lightMode ? "bg-white text-black" : "bg-gray-800 text-white"} mt-5 transition-colors p-5 flex flex-col gap-y-5 rounded-lg max-w-[800px] mx-auto shadow-lg`}
            >
                <div>
                    <input
                        type="text"
                        placeholder='Product Name'
                        className='input-style'
                        {...register("name", { required: "Product name is required." })}
                    />
                </div>
                <div>
                    <input
                        type="number"
                        placeholder='Price'
                        step={0.01}
                        className='input-style'
                        {...register("price", { required: "Price is required" })}
                    />
                </div>
                <div>
                    <input
                        type="url"
                        placeholder='Image URL'
                        className='input-style'
                        {...register("img", { required: "An image URL is required" })}
                    />
                </div>
                <button type='submit' className='bg-blue-500 rounded-lg py-2 font-semibold cursor-pointer text-white'>
                    Add Product
                </button>
            </form>
            {errors.name && <ErrorBlock error={{ title: "Register failed", message: errors.name.message }} />}
            {errors.price && <ErrorBlock error={{ title: "Register failed", message: errors.price.message }} />}
            {errors.img && <ErrorBlock error={{ title: "Register failed", message: errors.img.message }} />}
        </>
    )
}
