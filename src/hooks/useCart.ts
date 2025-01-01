import { useState } from "react";
import { coupons } from "../common/coupons";
import useCartReducer from "../jotai/CartReducer";

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

    const handleApplyCoupon = (couponCode: string) => {
        // fetch all coupons from the server
        // check if the coupon exists
        // apply the coupon
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

    const handleRemoveCoupon = () => {
        dispatch({
            type: "REMOVE_COUPON",
        })
    }
    return {
        cart,
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