import { FC, useState } from "react"
import { useCart } from "../../hooks/useCart"
import CloseIcon from "../Modal/CloseIcon"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { useModal } from "../../hooks/useModal"
import FormWrapper from "../../forms/FormWrapper"
import Login from "../../forms/Login"
import { getProduct } from "../../jotai/cart"
import { ICart, IProduct } from "../../interface"
import { ICoupon } from "../../data/coupons"

interface ICouponErrorProps {
    error: string
}

type ICouponSuccessProps = {
    couponCode: ICart['couponCode']
}

interface ITotalSummaryProps {
    cartTotal: ICart['cartTotal']
    discountAmount: ICart['discountAmount']
    finalAmount: ICart['finalAmount']
}

const CouponError: FC<ICouponErrorProps> = ({ error }) => {
    return <div className="text-red-500 text-sm mt-1">{error}</div>
}

const CouponSuccess: FC<ICouponSuccessProps> = ({ couponCode }) => {
    return couponCode ? (
        <div className="text-green-500 text-sm mt-1">{`Applied "${couponCode}" Successfully!`}</div>
    ) : (
        " "
    )
}

const TotalSummary: FC<ITotalSummaryProps> = ({ cartTotal, discountAmount, finalAmount }) => {
    return (
        <div className="flex flex-col items-start text-lg font-bold mt-2 ml-8 sm:mt-4">
            <div>Cart Total: ${cartTotal}</div>
            {discountAmount > 0 && (
                <>
                    <div className="text-sm text-gray-500">Discount: ${discountAmount}</div>
                    <div className="text-sm text-gray-500">Final: ${finalAmount}</div>
                </>
            )}
        </div>
    )
}

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
            await handleApplyCoupon(couponCode as ICoupon)
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
            <div className="w-full">
                {cart.items.length > 0 && (
                    <div className="p-4 flex flex-col w-full items-start">
                        {/* Coupon Section */}
                        <div className="mt-4">
                            <div className="flex items-center mt-2">
                                <input
                                    type="text"
                                    value={couponCode}
                                    onChange={(e) =>
                                        setCouponCode(e.target.value)
                                    }
                                    placeholder="Enter coupon code"
                                    className="border border-gray-300 p-2 rounded w-full"
                                />
                                <button
                                    onClick={applyCoupon}
                                    className={`ml-2 bg-blue-500 text-white px-4 py-2 rounded ${
                                        !!cart.couponCode &&
                                        "cursor-not-allowed opacity-50 bg-gray-500"
                                    }`}
                                    disabled={!!cart.couponCode}
                                >
                                    Apply
                                </button>
                            </div>
                            {(couponError || cart.couponCode) && (
                                <div className="flex items-center mt-2 sm:mt-4 min-h-[2.5rem]">
                                    {couponError && (
                                        <CouponError error={couponError} />
                                    )}
                                    {cart.couponCode && !couponError && (
                                        <CouponSuccess
                                            couponCode={cart.couponCode}
                                        />
                                    )}
                                    {cart.couponCode && !couponError && (
                                        <button
                                            onClick={handleRemoveCoupon}
                                            className="ml-2 text-red-500 text-sm"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {cart.finalAmount > 0 && (
                    <TotalSummary
                        cartTotal={cart.cartTotal}
                        discountAmount={cart.discountAmount}
                        finalAmount={cart.finalAmount}
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
