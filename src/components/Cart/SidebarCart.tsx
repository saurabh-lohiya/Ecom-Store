import { FC } from "react"
import { useCart } from "../../hooks/useCart"
import CloseIcon from "../Modal/CloseIcon"
import { getProduct } from "../../jotai/cart"
import { IProduct } from "../../interface"

interface SidebarCartProps {
    onClose: () => void
}

const SidebarCart: FC<SidebarCartProps> = ({ onClose }) => {
    const { cart, updateCartItemQuantity, handleRemoveCartItem } = useCart()

    return (
        <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-[10000] transform translate-x-0 transition-transform duration-300 flex flex-col justify-between">
            <div>
            <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                onClick={onClose}
            >
                <CloseIcon />
            </button>
            <h2 className="text-2xl font-bold p-4">Your Cart</h2>
            <div className="p-4 overflow-y-auto">
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
                                        handleRemoveCartItem(item.id)
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
            </div>
            {cart.items.length > 0 && (
                <button className="w-full bg-blue-500 text-white py-2 rounded-md m-4 hover:bg-blue-600">
                    Checkout
                </button>
            )}
        </div>
    )
}

export default SidebarCart
