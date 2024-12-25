import React, { FC } from "react"

interface ProductCardProps {
    title: string
    description: string
    price: number
    img: string
}

const ProductCard: FC<ProductCardProps> = (props) => {
    const { title, description, price, img } = props
    const [quantity, setQuantity] = React.useState(1)

    return (
        <div className="w-full h-[40vw] flex flex-col justify-between max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img src={img} alt={title} className="w-full h-[25vw] object-cover" />
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
                            name="quantity"
                            id="quantity"
                            type="number"
                            min="1"
                            value={quantity}
                            className="w-16 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                            onChange={(e) =>
                                setQuantity(Number(e.target.value))
                            }
                        />
                    </div>
                </div>
                <button className="mt-4 w-full bg-secondary text-white py-2 rounded-md hover:ring-secondary focus:ring-secondary transition-colors outline-none">
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default ProductCard
