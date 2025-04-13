import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./pages/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import RegisterProduct from "./pages/RegisterProduct.jsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="register-product" element={<RegisterProduct />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
