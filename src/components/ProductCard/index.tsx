import React, { FC } from "react"
import { useCart } from "../../hooks"

interface ProductCardProps {
    id: number
    title: string
    description: string
    price: number
    img: string
}

const ProductCard: FC<ProductCardProps> = (props) => {
    const { id, title, description, price, img } = props
    const {
        cart: { items },
        updateCartItemQuantity,
    } = useCart()
    const getItem = items.find((item) => item.id === id)
    const [quantity, setQuantity] = React.useState(getItem?.quantity || 1)

    const updateCart = (id: number, quantity: number) => {
        updateCartItemQuantity(id, quantity)
    }

    const increaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1)
    }

    const decreaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity - 1)
    }

    function truncateText(text: string, limit: number) {
        return text.length > limit ? text.slice(0, limit) + "..." : text
    }

    return (
        <div className="w-[90%] sm:w-full h-auto sm:h-72 md:h-80 lg:h-[480px] flex flex-col justify-between bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img
                src={img}
                alt={title}
                className="w-full h-48 sm:h-60 md:h-52 lg:h-60 object-cover"
            />
            <div className="px-6 py-4 flex flex-col justify-between flex-grow">
                <div>
                    <h2 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-semibold text-gray-800">
                        {title}
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-gray-600">
                        {truncateText(description, 72)}
                    </p>
                </div>
                <div>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-md sm:text-lg md:text-lg lg:text-xl font-bold text-gray-800">
                            ${price.toFixed(2)}
                        </span>
                        <div className="flex items-center">
                            <label
                                htmlFor="quantity"
                                className="mr-2 text-gray-700"
                            >
                                Qty:
                            </label>
                            <button
                                type="button"
                                className="bg-primary text-white px-2 py-1 rounded-md"
                                disabled={quantity === 1}
                                onClick={decreaseQuantity}
                            >
                                -
                            </button>
                            <span className="mx-2">{quantity}</span>
                            <button
                                type="button"
                                className="bg-primary text-white px-2 py-1 rounded-md"
                                onClick={increaseQuantity}
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <button
                        className="mt-4 w-full bg-secondary text-white py-2 rounded-md hover:ring-2 hover:ring-secondary focus:ring-2 focus:ring-secondary transition-colors outline-none"
                        onClick={() => updateCart(id, quantity)}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
