import useReducerAtom from "./useReducerAtom";
import { ICart } from "../interface"
import { cartAtom, initialCartState } from "./cart";

export enum CartActionTypes {
    APPLY_COUPON = "APPLY_COUPON",
    REMOVE_COUPON = "REMOVE_COUPON",
    CLEAR_CART = "CLEAR_CART",
    ADD_TO_CART = "ADD_TO_CART",
    REMOVE_CART_ITEM = "REMOVE_CART_ITEM",
    REDUCE_ITEM_QUANTITY = "REDUCE_ITEM_QUANTITY",
}

type initializeCartAction = {
    type: "INITIALIZE_CART",
    payload: Partial<ICart>
}

type updateCartItemQuantityAction = {
    type:"ADD_TO_CART",
    payload: {
        id: number;
        quantity: number;
    }
}

type RemoveFromCartAction = {
    type: "REDUCE_ITEM_QUANTITY",
    payload: {
        id: number;
    }
}

type ClearCartAction = {
    type: "CLEAR_CART",
}

type ApplyCouponAction = {
    type: "APPLY_COUPON"
    payload: Pick<
        ICart,
        "couponCode" | "cartTotal" | "finalAmount" | "discountAmount"
    >
}

type RemoveCouponAction = {
    type: "REMOVE_COUPON",
    payload: {
        finalAmount: number;
    }
}

type RemoveCartItemAction = {
    type: "REMOVE_CART_ITEM",
    payload: {
        id: number;
    }
}

type CartAction =
    | ApplyCouponAction
    | RemoveCouponAction
    | ClearCartAction
    | updateCartItemQuantityAction
    | RemoveFromCartAction
    | RemoveCartItemAction
    | initializeCartAction

const CartReducer = (
    state: ICart = initialCartState,
    action: CartAction
): ICart => {
    switch (action.type) {
        case "INITIALIZE_CART":
            return {
                ...state,
                ...action.payload,
                items: action.payload.items || [],
            }
        case "ADD_TO_CART": {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            )
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.id === action.payload.id
                            ? { ...item, quantity: action.payload.quantity }
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
                        quantity: action.payload.quantity,
                    },
                ],
            }
        }
        case "REDUCE_ITEM_QUANTITY": {
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
        case "REMOVE_CART_ITEM": {
            return {
                ...state,
                items: state.items.filter(
                    (item) => item.id !== action.payload.id
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
                cartTotal: action.payload.cartTotal,
                finalAmount: action.payload.finalAmount,
                discountAmount: action.payload.discountAmount,
            }
        case "REMOVE_COUPON":
            return {
                ...state,
                couponCode: undefined,
                discountAmount: 0,
                finalAmount: state.cartTotal,
                cartTotal: state.cartTotal,
            }

        default:
            return state
    }
}

function useCartReducer() {
    return useReducerAtom<ICart, CartAction>(cartAtom, CartReducer)
}

export default useCartReducer