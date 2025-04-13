import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getProducts } from '../services/products';
import ErrorBlock from '../components/common/ErrorBlock';
import Spinner from '../components/common/Spinner';
import ProductList from '../components/products/ProductList';
import { Link } from 'react-router';
import useTheme from '../store/theme-mode';

export default function HomePage() {
    const lightMode = useTheme(state => state.lightMode);

    const productsQuery = useQuery({
        queryKey: ['products'],
        queryFn: () => getProducts()
    });

    const products = productsQuery?.data?.data;

    return (
        <>
            <h1
                className="text-3xl text-blue-600 text-center font-semibold"
            >
                Current Products
            </h1>
            <section className="mt-5">
                {
                    productsQuery.isError ?
                        <ErrorBlock error={productsQuery.error} /> : productsQuery.isFetching ?
                            <Spinner /> : products.length ?
                                <ProductList products={products} /> :
                                <div
                                    className={`${lightMode ? "text-black" : "text-white"} flex justify-center gap-1 w-[100%] mt-10`}
                                >
                                    <p>No products found.</p>
                                    <Link
                                        to={"register-product"}
                                        className='text-blue-600 font-bold hover:underline'
                                    >
                                        Register a product.
                                    </Link>
                                </div>
                }
            </section>
        </>
    )
}
