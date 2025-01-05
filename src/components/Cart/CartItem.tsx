
import { FC } from "react"
import { IcartItem, IProduct } from "../../interface"
import { getProduct } from "../../jotai/cart"
import { useCart } from "../../hooks"

interface CartItemProps {
    item: IcartItem
}

const CartItem: FC<CartItemProps> = ({ item }) => {
    const product = getProduct(item.id) as IProduct
    const { title, price } = product
    const {updateCartItemQuantity, handleRemoveFromCart} = useCart()

    return (
        <div className="flex items-center justify-between mb-4">
            <div>
                <h3 className="font-semibold">{title}</h3>
                <p>${price.toFixed(2)}</p>
            </div>
            <div className="flex items-center">
                <button
                    onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-300 rounded"
                    disabled={item.quantity === 1}
                >
                    -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                    onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-300 rounded"
                >
                    +
                </button>
            </div>
            <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="ml-4 text-red-500"
            >
                Remove
            </button>
        </div>
    )
}

export default CartItem