import useReducerAtom from "./useReducerAtom";
import { ICart } from "../interface"
import { cartAtom, initialCartState } from "./cart";

export enum CartActionTypes {
    APPLY_COUPON = "APPLY_COUPON",
    REMOVE_COUPON = "REMOVE_COUPON",
    CLEAR_CART = "CLEAR_CART",
    ADD_TO_CART = "ADD_TO_CART",
    REMOVE_FROM_CART = "REMOVE_FROM_CART",
}

type AddToCartAction = {
    type:"ADD_TO_CART",
    payload: {
        id: number;
    }
}

type RemoveFromCartAction = {
    type: "REMOVE_FROM_CART",
    payload: {
        id: number;
    }
}

type ClearCartAction = {
    type: "CLEAR_CART",
}

type ApplyCouponAction = {
    type: "APPLY_COUPON",
    payload: Pick<ICart, 'couponCode'>
}

type RemoveCouponAction = {
    type: "REMOVE_COUPON",
}

type CartAction =
    | ApplyCouponAction
    | RemoveCouponAction
    | ClearCartAction
    | AddToCartAction
    | RemoveFromCartAction

const CartReducer = (
    state: ICart = initialCartState,
    action: CartAction
): ICart => {
    switch (action.type) {
        case "ADD_TO_CART": {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            )
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                }
            }
            return {
                ...state,
                items: [
                    ...state.items,
                    {
                        id: action.payload.id,
                        quantity: 1,
                    },
                ],
            }
        }
        case "REMOVE_FROM_CART": {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            )
            if (existingItem && existingItem.quantity === 1) {
                return {
                    ...state,
                    items: state.items.filter(
                        (item) => item.id !== action.payload.id
                    ),
                }
            }
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                ),
            }
        }
        case "CLEAR_CART":
            return {
                ...state,
                items: [],
            }
        case "APPLY_COUPON":
            return {
                ...state,
                couponCode: action.payload.couponCode,
            }
        case "REMOVE_COUPON":
            return {
                ...state,
                couponCode: "",
            }

        default:
            return state
    }
}

function useCartReducer() {
    return useReducerAtom<ICart, CartAction>(cartAtom, CartReducer)
}

export default useCartReducer