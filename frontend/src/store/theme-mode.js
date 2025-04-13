import { create } from "zustand";

const useTheme = create((set) => {
  return {
    lightMode: false,
    actions: {
      switchMode: () => {
        set((state) => {
          return { lightMode: !state.lightMode };
        });
      },
    },
  };
});

export default useTheme;
