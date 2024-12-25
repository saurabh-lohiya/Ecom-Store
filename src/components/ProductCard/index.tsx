import React from 'react'

interface ProductProps {
    image: string
    name: string
    price: number
}

const ProductCard: React.FC<ProductProps> = ({ image, name, price }) => {
    return (
        <div className="border rounded-lg shadow-md p-4">
            <img src={image} alt={name} className="w-full h-48 object-cover mb-4" />
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-secondary">${price}</p>
            <button className="mt-2 bg-secondary text-white px-4 py-2 rounded">Add to Cart</button>
        </div>
    )
}

export default ProductCard