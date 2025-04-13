import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTheme = create(
  persist(
    (set) => {
        const switchMode = () => {
            set(state => ({lightMode: !state.lightMode}));
        }

      return {
        lightMode: false,
        actions: {
          switchMode,
        },
      };
    },
    {
        name: "theme-storage",
        partialize: state => ({lightMode: state.lightMode})
    //   partialize: (state) =>
    //     Object.fromEntries(
    //       Object.entries(state).filter(([key]) => !["actions"].includes(key))
    //     ),
    }
  )
);

export default useTheme;