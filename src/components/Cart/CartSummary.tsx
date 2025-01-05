import { FC } from "react"
import { useCart } from "../../hooks"

const CartSummary: FC = () => {
    const {cart: {cartTotal, discountAmount, finalAmount}} = useCart()
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

export default CartSummary