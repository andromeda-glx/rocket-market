import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getProducts } from '../services/products';
import Product from '../components/Product';
import ErrorBlock from '../components/ErrorBlock';
import Spinner from '../components/Spinner';

export default function HomePage() {
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
                            <Spinner /> :
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 py-5">
                                {
                                    products.map(product => (
                                        <li key={product.id}>
                                            <Product productDetails={product} />
                                        </li>
                                    ))
                                }
                            </ul>
                }
            </section>
        </>
    )
}
