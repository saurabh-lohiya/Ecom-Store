import { FC } from "react"
import ProductCard from "../ProductCard"
import type { IProducts } from "../../interface"
import { productCategoryMap } from "../../data/products"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import './ProductCollection.scss'
import 'swiper/swiper-bundle.css'
import 'swiper/modules';

interface ProductCollectionProps {
    products: IProducts
    categoryId: number
}

const ProductCollection: FC<ProductCollectionProps> = (props) => {
    const { products, categoryId } = props
    const categoryName = productCategoryMap[categoryId]
    return (
        <section className="container mx-auto my-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                {categoryName}
            </h1>
            <Swiper
                pagination={{
                    dynamicBullets: true,
                    clickable: true,
                }}
                slidesPerView={3}
                modules={[Pagination]}
                className="mySwiper"
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id} className="w-60">
                        <ProductCard
                            id={product.id}
                            title={product.title}
                            description={product.description}
                            price={product.price}
                            img={product.img}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

export default ProductCollection
