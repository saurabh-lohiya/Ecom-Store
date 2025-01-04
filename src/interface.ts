// Consider moving interfaces here to global.d.ts or importing them where needed

type IUser = {
    name: string;
    email: string;
    isAuthenticated: boolean;
    isAdmin: boolean;
    cart: ICart;
}

type IProduct = {
    id: number;
    title: string;
    description: string;
    categoryId: number;
    price: number;
    img: string;
}

type IWritableProduct = Omit<IProduct, "id">

type IcartItem = {
    id: number;
    quantity: number;
}

type ICart = {
    items: IcartItem[];
    total: number;
    count: number;
    couponCode: string;
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

export type {
    IUser,
    IProduct,
    IWritableProduct,
    ICart,
    IcartItem,
    IProducts,
    IProductCollection,
    IProductCategory,
    IProductCategoryName,
}