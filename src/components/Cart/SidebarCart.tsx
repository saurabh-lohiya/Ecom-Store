import { FC, useState } from "react"
import { useCart } from "../../hooks/useCart"
import CloseIcon from "../Modal/CloseIcon"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom" // Ensure react-router-dom is installed
import { useModal } from "../../hooks/useModal"
import FormWrapper from "../../forms/FormWrapper"
import Login from "../../forms/Login"
import {  getProduct } from "../../jotai/cart"
import { IProduct } from "../../interface"

const SidebarCart: FC<{ onClose: () => void }> = ({ onClose }) => {
    const {
        cart,
        handleRemoveFromCart,
        updateCartItemQuantity,
        handleApplyCoupon,
        handleRemoveCoupon,
    } = useCart()
    const {
        userState: { isAuthenticated },
    } = useAuth()
    const navigate = useNavigate()
    const { toggleModalState } = useModal()
    const [couponCode, setCouponCode] = useState<string>("")
    const [couponError, setCouponError] = useState<string>("")

    const applyCoupon = async () => {
        try {
            await handleApplyCoupon(couponCode)
            setCouponError("")
            setCouponCode("")
        } catch (error: any) {
            setCouponError(error.message)
        }
    }

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
        <div className="fixed top-0 right-0 h-full w-80 flex flex-col justify-between items-center bg-white shadow-lg z-[10000] transform translate-x-0 transition-transform duration-300">
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
                    cart.items.map((item) => {
                        const product = getProduct(item.id)
                        const { title, price } = product as IProduct
                        return (
                            <div
                                key={item.id}
                                className="flex items-center justify-between mb-4"
                            >
                                <div>
                                    <h3 className="font-semibold">{title}</h3>
                                    <p>${price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        onClick={() =>
                                            updateCartItemQuantity(
                                                item.id,
                                                item.quantity - 1
                                            )
                                        }
                                        className="px-2 py-1 bg-gray-300 rounded"
                                        disabled={item.quantity === 1}
                                    >
                                        -
                                    </button>
                                    <span className="mx-2">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() =>
                                            updateCartItemQuantity(
                                                item.id,
                                                item.quantity + 1
                                            )
                                        }
                                        className="px-2 py-1 bg-gray-300 rounded"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={() =>
                                        handleRemoveFromCart(item.id)
                                    }
                                    className="ml-4 text-red-500"
                                >
                                    Remove
                                </button>
                            </div>
                        )
                    })
                )} 
            </div>
            <div className="p-4">
                {/* Coupon Section */}
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Apply Coupon</h3>
                    <div className="flex items-center mt-2">
                        <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Enter coupon code"
                            className="border border-gray-300 p-2 rounded w-full"
                        />
                        <button
                            onClick={applyCoupon}
                            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Apply
                        </button>
                    </div>
                    {couponError && (
                        <p className="text-red-500 text-sm mt-1">
                            {couponError}
                        </p>
                    )}
                    {cart.couponCode && (
                        <div className="flex items-center mt-2">
                            <span className="text-green-500 text-sm">
                                Coupon "{cart.couponCode}" applied.
                            </span>
                            <button
                                onClick={handleRemoveCoupon}
                                className="ml-2 text-red-500 text-sm"
                            >
                                Remove
                            </button>
                        </div>
                    )}
                </div>
                <div className="text-lg font-bold mt-4">
                    Total: ${cart.total}
                </div>
                <button
                    onClick={handleCheckout}
                    className="w-full mt-4 bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                >
                    Checkout
                </button>
            </div>
        </div>
    )
}

export default SidebarCart
