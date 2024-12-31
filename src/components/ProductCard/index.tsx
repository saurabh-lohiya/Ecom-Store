import React, { FC } from "react"
import { useCart } from "../../hooks/useCart"

interface ProductCardProps {
    id: number
    title: string
    description: string
    price: number
    img: string
}

const ProductCard: FC<ProductCardProps> = (props) => {
    const { id, title, description, price, img } = props
    const { cart: {items}, updateCartItemQuantity } = useCart()
    const getItem = items.find((item) => item.id === id)
    const [quantity, setQuantity] = React.useState(getItem?.quantity || 1)

    const updateCart = (id: number, quantity: number) => {
        updateCartItemQuantity(id, quantity)
    }

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1)
    }

    const decreaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity - 1)
    }

    return (
        <div className="w-full h-[40vw] flex flex-col justify-between max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img
                src={img}
                alt={title}
                className="w-full h-[25vw] object-cover"
            />
            <div className="px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                <p className="mt-2 text-sm text-gray-600">{description}</p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-800">
                        ${price.toFixed(2)}
                    </span>
                    <div className="flex items-center">
                        <label
                            htmlFor="quantity"
                            className="mr-2 text-gray-700"
                        >
                            Qty:
                        </label>
                        <input
                            type="button"
                            value="-"
                            className="bg-primary text-white px-2 py-1 rounded-md"
                            disabled={quantity === 1}
                            onClick={decreaseQuantity}
                        />
                        <span className="mx-2">{quantity}</span>
                        <input
                            type="button"
                            value="+"
                            className="bg-primary text-white px-2 py-1 rounded-md"
                            onClick={increaseQuantity}
                        />
                    </div>
                </div>
                <button
                    className="mt-4 w-full bg-secondary text-white py-2 rounded-md hover:ring-secondary focus:ring-secondary transition-colors outline-none"
                    onClick={() => updateCart(id, quantity)}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default ProductCard
