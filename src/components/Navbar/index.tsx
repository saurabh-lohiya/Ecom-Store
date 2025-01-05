import { useAuth } from "../../hooks"
import { useModal } from "../../hooks"
import Login from "../../forms/Login"
import FormWrapper from "../../forms/FormWrapper"
import Signup from "../../forms/Signup"
import { useCart } from "../../hooks"
import SidebarCart from "../Cart/SidebarCart"
import { useState } from "react" // Added import for useState

const Navbar = () => {
    const { userState, logout } = useAuth() // Import logout from useAuth
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) // Added state for mobile menu
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
            <nav className="w-full max-w-[90%] bg-white shadow fixed top-4 left-[5%] z-50 mx-auto">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="logo text-xl font-bold">
                            HealthStore
                        </div>
                        <div className="hidden md:block">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="border rounded px-2 py-1 min-w-[200px] outline-none"
                            />
                        </div>
                        <div className="hidden sm:flex sm:space-x-4">
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
                                <>
                                    <button
                                        onClick={navigateToProfile}
                                        className="text-gray-800 bg-transparent border-none cursor-pointer"
                                    >
                                        Profile
                                    </button>
                                    <button
                                        onClick={logout} // Add Logout button
                                        className="text-gray-800 bg-transparent border-none cursor-pointer"
                                    >
                                        Logout
                                    </button>
                                </>
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
                        <button
                            className="sm:hidden text-gray-800"
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            aria-label="Toggle menu"
                        >
                            {/* Hamburger Icon */}
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={
                                        isMobileMenuOpen
                                            ? "M6 18L18 6M6 6l12 12"
                                            : "M4 6h16M4 12h16M4 18h16"
                                    }
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                {isMobileMenuOpen && (
                    <div className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {!isAuthenticated ? (
                                <>
                                    <button
                                        onClick={() => openModal(Signup)}
                                        className="block text-gray-800 w-full text-left px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        Sign Up
                                    </button>
                                    <button
                                        onClick={() => openModal(Login)}
                                        className="block text-gray-800 w-full text-left px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        Login
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={navigateToProfile}
                                        className="block text-gray-800 w-full text-left px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        Profile
                                    </button>
                                    <button
                                        onClick={logout} // Add Logout button
                                        className="block text-gray-800 w-full text-left px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                            {/* Add Cart button */}
                            <button
                                onClick={openSidebar}
                                className="relative block text-gray-800 w-full text-left px-3 py-2 rounded-md text-base font-medium"
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
                )}
            </nav>
            {isSidebarCartOpen && <SidebarCart onClose={closeSidebar} />}
        </>
    )
}

export default Navbar
