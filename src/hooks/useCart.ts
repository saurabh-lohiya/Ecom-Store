import { useState } from "react";
import { coupons } from "../common/coupons";
import useCartReducer from "../jotai/CartReducer";
import { getProduct } from "../jotai/cart";

export function useCart() {
    const [cart, dispatch] = useCartReducer()
    const [isSidebarCartOpen, setIsSidebarCartOpen] = useState(false)

    const updateCartItemQuantity = (id: number, quantity: number) => {
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                id,
                quantity,
            },
        })
    }

    const handleRemoveFromCart = (id: number) => {
        dispatch({
            type: "REDUCE_ITEM_QUANTITY",
            payload: {
                id,
            },
        })
    }

    const handleRemoveCartItem = (id: number) => {
        dispatch({
            type: "REMOVE_CART_ITEM",
            payload: {
                id,
            },
        })
    }

    const handleClearCart = () => {
        dispatch({
            type: "CLEAR_CART",
        })
    }

    const handleApplyCoupon = async (couponCode: string) => {
        // fetch coupon from server
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const isCouponValid = Object.prototype.hasOwnProperty.call(coupons, couponCode)
        if (!isCouponValid) {
            throw new Error("Invalid coupon")
        }
        dispatch({
            type: "APPLY_COUPON",
            payload: {
                couponCode,
            },
        })
    }

    const calculateCartTotal = () => {
        const itemsTotal=  cart.items.reduce((acc, item) => {
            const product = getProduct(item.id)
            if (!product) {
                throw new Error(`Product with id ${item.id} not found`)
            }
            return acc + product.price * item.quantity
        }, 0)
        const discount = cart.couponCode ? coupons[cart.couponCode] : 0
        return parseFloat((itemsTotal * (1 - discount / 100)).toFixed(2))
    }

    const handleRemoveCoupon = () => {
        dispatch({
            type: "REMOVE_COUPON",
        })
    }

    return {
        cart: { ...cart, total: calculateCartTotal() },
        isSidebarCartOpen,
        setIsSidebarCartOpen,
        updateCartItemQuantity,
        handleRemoveFromCart,
        handleRemoveCartItem,
        handleClearCart,
        handleApplyCoupon,
        handleRemoveCoupon,
    } as const
}