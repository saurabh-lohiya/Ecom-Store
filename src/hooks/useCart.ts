import { useCallback, useEffect, useState } from "react";
import { couponsDiscountMap, ICoupon } from "../data/coupons";
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

    const handleApplyCoupon = async (couponCode: ICoupon) => {
        // fetch coupon from server
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const isCouponValid = Object.prototype.hasOwnProperty.call(
            couponsDiscountMap,
            couponCode
        )
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

    const calculateCartTotal = useCallback(() => {
        const itemsTotal = cart.items.reduce((acc, item) => {
            const product = getProduct(item.id)
            if (!product) {
                throw new Error(`Product with id ${item.id} not found`)
            }
            return acc + product.price * item.quantity
        }, 0)
        const discountAmount = parseFloat(((cart.couponCode ? couponsDiscountMap[cart.couponCode] : 0) * itemsTotal / 100).toFixed(2))
        const finalAmount = parseFloat((itemsTotal * (1 - discountAmount / 100)).toFixed(2))
        return {
            itemsTotal,
            discountAmount,
            finalAmount,
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(cart.items)])

    const handleRemoveCoupon = () => {
        dispatch({
            type: "REMOVE_COUPON",
        })
    }


    useEffect(() => {
        dispatch({
            type: "INITIALIZE_CART",
            payload: {
                items: cart.items,
                ...calculateCartTotal(),
            },
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(cart.items), cart.couponCode, calculateCartTotal, dispatch])

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