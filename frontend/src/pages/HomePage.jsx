import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getProducts } from '../services/products';
import ErrorBlock from '../components/common/ErrorBlock';
import Spinner from '../components/common/Spinner';
import ProductList from '../components/products/ProductList';

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
                            <ProductList products={products} />
                }
            </section>
        </>
    )
}
