import { atom } from "jotai"
import { ICart, IcartItem } from "../interface"
import { products } from "../common/products"

function getProduct(id: number) {
    return products.find((product) => product.id === id)
}

export const initialCartState = {
    items: [],
    total: 0,
    count: 0,
    couponCode: "",
}

const cartItemsAtom = atom<IcartItem[]>([])

const cartTotalAtom = atom((get) => {
    const cart = get(cartItemsAtom)
    return cart.reduce((acc, item) => {
        const product = getProduct(item.id)
        if (!product) {
            throw new Error(`Product with id ${item.id} not found`)
        }
        return acc + product.price * item.quantity
    }, 0)
})

const cartCountAtom = atom((get) => {
    const cart = get(cartItemsAtom)
    return cart.reduce((acc, item) => acc + item.quantity, 0)
})

const cartAtom = atom<ICart>(initialCartState)

const getCartAtom = atom((get) => {
    return {
        items: get(cartItemsAtom),
        total: get(cartTotalAtom),
        count: get(cartCountAtom),
    }
})

export { cartAtom, getCartAtom, cartItemsAtom, cartTotalAtom, cartCountAtom }