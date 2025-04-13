import React from 'react'
import Header from '../components/Header'
import useTheme from '../store/theme-mode';
import { Outlet } from 'react-router';
import EditProductModal from '../components/EditProductModal';

export default function MainLayout() {
    const lightMode = useTheme((state) => state.lightMode);

    return (
        <>
            <Header />
            <main className={`${lightMode ? "bg-gray-100" : "bg-gray-900"} min-h-dvh w-[100%] pt-10 transition-colors`}>
                <div className="h-[100%] px-5 max-w-[1200px] mx-auto">
                    <Outlet />
                </div>
            </main>
            <EditProductModal />
        </>
    )
}
