import { FC } from "react"
import { useCart } from "../../hooks"
import CloseIcon from "../Modal/CloseIcon"
import { useAuth } from "../../hooks"
import { useNavigate } from "react-router-dom"
import { useModal } from "../../hooks"
import FormWrapper from "../../forms/FormWrapper"
import Login from "../../forms/Login"
import CartItem from "./CartItem" 
import CouponSection from "./CouponSection"
import CartSummary from "./CartSummary"

const SidebarCart: FC<{ onClose: () => void }> = ({ onClose }) => {
    const { cart } = useCart()
    const {
        userState: { isAuthenticated },
    } = useAuth()
    const navigate = useNavigate()
    const { toggleModalState } = useModal()

    const handleCheckout = () => {
        if (!isAuthenticated) {
            toggleModalState(
                <FormWrapper>
                    <Login />
                </FormWrapper>
            )
            onClose()
        } else {
            navigate("/orders")
            onClose()
        }
    }

    return (
        <div className="fixed top-0 right-0 h-full w-80 flex flex-col justify-between items-center bg-white shadow-lg z-[10000] transform translate-x-0 transition-transform duration-300 pb-4">
            <div className="p-4 overflow-y-auto">
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                    onClick={onClose}
                >
                    <CloseIcon />
                </button>
                <h2 className="text-2xl font-bold p-4">Your Cart</h2>
                {cart.items.length === 0 ? (
                    <p className="text-gray-600">Your cart is empty.</p>
                ) : (
                    cart.items.map((item) => (
                        <CartItem
                            key={item.id} 
                            item={item} 
                        />
                    ))
                )}
            </div>
            <div className="w-full">
                {cart.items.length > 0 && (
                    <CouponSection/>
                )}
                {cart.finalAmount > 0 && (
                    <CartSummary
                    />
                )}
                <button
                    onClick={handleCheckout}
                    className="w-full max-w-[85%] mt-4 bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                >
                    Checkout
                </button>
            </div>
        </div>
    )
}

export default SidebarCart
