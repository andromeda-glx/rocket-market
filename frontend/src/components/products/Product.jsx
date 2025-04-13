import React from 'react'
import { formatPrice } from '../../utils/format-price.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import useTheme from '../../store/theme-mode.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct } from '../../services/products.js';
import useProductModal from '../../store/product-modal.js';

export default function Product({ productDetails }) {
    const { lightMode } = useTheme((state) => state);

    const setProduct = useProductModal(state => state.setProduct);
    const setModalOpen = useProductModal(state => state.setModalOpen);

    const { id, name, price, img } = productDetails;

    const queryClient = useQueryClient();
    const deleteProductMutation = useMutation({
        mutationFn: (productId) => deleteProduct(productId),
        onSuccess: () => queryClient.invalidateQueries('products')
    })

    return (
        <div className={`w-[100%] ${lightMode ? "bg-white" : "bg-gray-800"} grid grid-rows-[150px_1fr] rounded-t-lg rounded-b-lg hover:-translate-y-1 transition-transform shadow-md`}>
            <div className="">
                <img
                    className='w-[100%] h-[100%] object-center object-cover rounded-t-lg'
                    src={img}
                    alt={`${name}`}
                />
            </div>
            <div className={`${lightMode ? "text-gray-800" : "text-white"} px-3 py-5 flex flex-col gap-y-3 transition-colors`}>
                <h2 className='text-lg font-semibold'>
                    {name}
                </h2>
                <h3 className='text-lg font-semibold'>
                    {formatPrice(price)}
                </h3>
                <div className="flex gap-x-3 text-gray-800">
                    <button
                        className='w-[40px] h-[40px] rounded-md bg-blue-400 opacity-80 cursor-pointer hover:opacity-100 transition-colors'
                        onClick={() => {
                            setProduct(productDetails);
                            setModalOpen(true);
                        }}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                        className='w-[40px] h-[40px] rounded-md bg-red-400 opacity-80 cursor-pointer hover:opacity-100 transition-colors'
                        onClick={() => deleteProductMutation.mutate(id)}
                    >
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </div>
            </div>
        </div>
    )
}
