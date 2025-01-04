import { productCategoryMap } from "../data/products"
import ProductCollection from "../components/ProductCollection"
import { products } from "../data/products"
import { IProducts } from "../interface"

function Home() {
    function getProductsByCategory(categoryId: number, products: IProducts) {
        return products.filter((product) => product.categoryId == categoryId)
    }

    return (
        <div>
            {Object.keys(productCategoryMap).map((categoryId) => {
                const category_id = parseInt(categoryId)
                const categoryProducts = getProductsByCategory(
                    category_id,
                    products
                )
                return (
                    <ProductCollection
                        key={category_id}
                        products={categoryProducts}
                        categoryId={category_id}
                    />
                )
            })}
        </div>
    )
}

export default Home
