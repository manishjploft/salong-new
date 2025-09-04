import { create } from 'zustand';

interface ProductDetailState {
  selectedVariant: null | any;
  setSelectedVariant: (variant: any | null) => void;
  clearSelectedVariant: () => void;
}

const useProductDetailStore = create<ProductDetailState>((set) => ({
  selectedVariant: null,
  setSelectedVariant: (variant: any | null) =>
    set((state) => ({ ...state, selectedVariant: variant })),
  clearSelectedVariant: () => set({ selectedVariant: null }),
}));

export default useProductDetailStore;