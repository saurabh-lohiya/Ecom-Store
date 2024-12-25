// Consider moving interfaces here to global.d.ts or importing them where needed
type IProduct = {
    id: number;
    title: string;
    description: string;
    categoryId: number;
    price: number;
    img: string;
}

type IProductCategoryName =
    | "Bath"
    | "Beverages"
    | "Pet Care"
    | "Ghee"
    | "Cereals & Grains"
    | "Bakery"
    | "Snacks"
    | "Gourmet Foods"

type IProducts = Array<IProduct>;

type IProductCategory = {
    id: number;
    name: IProductCategoryName;
}

type IProductCollection = {
    products: IProducts;
    category: string;
}

export type { IProduct, IProducts, IProductCollection, IProductCategory, IProductCategoryName };