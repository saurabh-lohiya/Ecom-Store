import { useAuth } from "../../hooks/useAuth"
import { useModal } from "../../hooks/useModal" 
import Login from "../../forms/Login"
import FormWrapper from "../../forms/FormWrapper"
import Signup from "../../forms/Signup"
import { useCart } from "../../hooks/useCart"
import SidebarCart from "../Cart/SidebarCart"

const Navbar = () => {
    const { userState } = useAuth()
    const isAuthenticated = userState.isAuthenticated
    const { toggleModalState } = useModal()
    const { cart, isSidebarCartOpen, setIsSidebarCartOpen } = useCart()

    const openModal = (FormComponent: React.FC) => {
        toggleModalState(
            <FormWrapper>
                <FormComponent />
            </FormWrapper>
        )
    }

    const navigateToProfile = () => {
        // Implement navigation to profile page, e.g., using react-router
        // history.push('/profile')
    }

    const openSidebar = () => {
        setIsSidebarCartOpen(true)
    }

    const closeSidebar = () => {
        setIsSidebarCartOpen(false)
    }

    return (
        <>
            <nav className="w-full max-w-[1280px] bg-white shadow fixed top-2 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="logo text-xl font-bold">
                            HealthStore
                        </div>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border rounded px-2 py-1 min-w-[50vw] outline-none"
                        />
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {!isAuthenticated ? (
                                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                    {/* Replace Sign Up link with button */}
                                    <button
                                        onClick={() => openModal(Signup)}
                                        className="text-gray-800 bg-transparent border-none cursor-pointer"
                                    >
                                        Sign Up
                                    </button>
                                    <button
                                        onClick={() => openModal(Login)}
                                        className="text-gray-800 bg-transparent border-none cursor-pointer"
                                    >
                                        Login
                                    </button>
                                </div>
                            ) : (
                                // Replace Profile link with button
                                <button
                                    onClick={navigateToProfile}
                                    className="text-gray-800 bg-transparent border-none cursor-pointer"
                                >
                                    Profile
                                </button>
                            )}
                            {/* Add Cart button */}
                            <button
                                onClick={openSidebar}
                                className="relative text-gray-800 bg-transparent border-none cursor-pointer"
                            >
                                Cart
                                {cart.items.length > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                                        {cart.items.length}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            {isSidebarCartOpen && <SidebarCart onClose={closeSidebar} />}
        </>
    )
}

export default Navbar