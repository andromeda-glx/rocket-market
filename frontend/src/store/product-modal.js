import { create } from "zustand";

const useProductModal = create((set) => ({
  isModalOpen: false,
  product: null,
  setModalOpen: (isOpen) => {
    set(() => {
      return {
        isModalOpen: isOpen,
      };
    });
  },
  setProduct: (productDetails) => {
    set(() => {
      return {
        product: productDetails,
      };
    });
  },
}));

export default useProductModal;
