// Consider moving interfaces here to global.d.ts or importing them where needed

import { ICoupon } from "./data/coupons";

type IAuthenticatedUser = {
    id: number;
    name: string;
    email: string;
    isAuthenticated: true;
    isAdmin: boolean;
    cart: ICart;
}

type IUnauthenticatedUser = {
    id: undefined;
    name: "";
    email: "";
    isAuthenticated: false;
    isAdmin: false;
    cart: ICart;
}

type IUser = {
    id: number | undefined;
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
    distinctItemsCount: number
    totalItemsCount: number
    cartTotal: number
    finalAmount: number
    discountAmount: number
    couponCode: ICoupon | undefined;
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

type IOrder = ICart & {
    id: number
    userId: number
}

export type {
    IAuthenticatedUser,
    IUnauthenticatedUser,
    IUser,
    IProduct,
    IWritableProduct,
    ICart,
    IcartItem,
    IProducts,
    IProductCollection,
    IProductCategory,
    IProductCategoryName,
    IOrder
}