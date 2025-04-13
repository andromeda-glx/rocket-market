import Product from "./Product";

export default function ProductList({ products }) {
    return (
        <div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 py-5">
                {
                    products.map(product => (
                        <li key={product._id}>
                            <Product productDetails={product} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
