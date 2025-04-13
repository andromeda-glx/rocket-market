import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { updateProduct } from "../services/products";
import useProductModal from "../store/product-modal";
import { createPortal } from "react-dom";

export default function EditProductModal() {
    const { register, handleSubmit, reset } = useForm();

    const isOpen = useProductModal(state => state.isModalOpen);
    const setModalOpen = useProductModal(state => state.setModalOpen);
    const product = useProductModal(state => state.product);
    const setProduct = useProductModal(state => state.setProduct);

    const queryClient = useQueryClient();
    const productUpdate = useMutation({
        mutationFn: (data) => updateProduct(product.id, data),
        onSuccess: () => {
            reset();
            setModalOpen(false);
            return queryClient.invalidateQueries('products');
        }
    })

    function onSubmit(data) {
        productUpdate.mutate(data);
    }

    return (
        createPortal(
            isOpen &&
            <div className="bg-black/40 fixed flex justify-center inset-0 z-5">
                <div
                    className="bg-gray-700 mt-20 h-fit text-white p-7 relative rounded-lg w-[80%] md:w-[50%] max-w-[600px]"
                >
                    <FontAwesomeIcon
                        className="absolute top-4 right-4 cursor-pointer text-gray-300 hover:text-white transition-colors"
                        icon={faXmark}
                        size="lg"
                        onClick={() => {
                            setProduct(null);
                            setModalOpen(false)
                        }}
                    />
                    <h2 className="text-xl font-semibold mb-7">
                        Update Product
                    </h2>
                    <form className="flex flex-col gap-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <input
                                className="input-style"
                                type="text"
                                placeholder="Name"
                                defaultValue={product.name}
                                {...register("name", { required: true })}
                            />
                        </div>
                        <div>
                            <input
                                className="input-style"
                                type="number"
                                step={0.01}
                                placeholder="Price ($)"
                                defaultValue={product.price}
                                {...register("price", { required: true })}
                            />
                        </div>
                        <div>
                            <input
                                className="input-style"
                                type="url"
                                placeholder="Image URL"
                                defaultValue={product.img}
                                {...register("img", { required: true })}
                            />
                        </div>
                        <div className="flex justify-end gap-x-5">
                            <button
                                className="bg-blue-300 text-gray-700 font-semibold py-2 px-4 rounded-md cursor-pointer"
                                type="submit"
                            >
                                Update
                            </button>
                            <button
                                className="font-semibold rounded-md cursor-pointer"
                                onClick={() => {
                                    setProduct(null);
                                    reset();
                                    setModalOpen(false);
                                }}
                                type="button"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            , document.body, "update-product-modal")
    )
}
