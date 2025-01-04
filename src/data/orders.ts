import { type IOrder } from "../interface"

export const totalOrders: Array<IOrder> = [
    // Create 10 orders here
    {
        id: 1,
        items: [
            { id: 1, quantity: 2 },
            { id: 2, quantity: 1 },
        ],
        distinctItemsCount: 2,
        totalItemsCount: 3,
        couponCode: "SAVE10",
        cartTotal: 200,
        finalAmount: 180,
        discountAmount: 20,
        userId: 1,
    },
    {
        id: 2,
        items: [
            { id: 1, quantity: 2 },
            { id: 2, quantity: 1 },
        ],
        distinctItemsCount: 2,
        totalItemsCount: 3,
        couponCode: "SAVE20",
        cartTotal: 200,
        finalAmount: 160,
        discountAmount: 40,
        userId: 2,
    },
    {
        id: 3,
        items: [
            { id: 1, quantity: 2 },
            { id: 2, quantity: 1 },
        ],
        distinctItemsCount: 2,
        totalItemsCount: 3,
        couponCode: "FREESHIP",
        cartTotal: 200,
        finalAmount: 195,
        discountAmount: 5,
        userId: 3,
    },
    {
        id: 4,
        items: [
            { id: 1, quantity: 2 },
            { id: 2, quantity: 1 },
        ],
        distinctItemsCount: 2,
        totalItemsCount: 3,
        couponCode: "SAVE10",
        cartTotal: 200,
        finalAmount: 180,
        discountAmount: 20,
        userId: 2,
    },
    {
        id: 5,
        items: [
            { id: 1, quantity: 2 },
            { id: 2, quantity: 1 },
        ],
        distinctItemsCount: 2,
        totalItemsCount: 3,
        couponCode: "SAVE20",
        cartTotal: 200,
        finalAmount: 160,
        discountAmount: 40,
        userId: 2,
    },
    {
        id: 6,
        items: [
            { id: 1, quantity: 2 },
            { id: 2, quantity: 1 },
        ],
        distinctItemsCount: 2,
        totalItemsCount: 3,
        couponCode: "FREESHIP",
        cartTotal: 200,
        finalAmount: 195,
        discountAmount: 5,
        userId: 1,
    },
    {
        id: 7,
        items: [
            { id: 1, quantity: 2 },
            { id: 2, quantity: 1 },
        ],
        distinctItemsCount: 2,
        totalItemsCount: 3,
        couponCode: "SAVE10",
        cartTotal: 200,
        finalAmount: 180,
        discountAmount: 20,
        userId: 5,
    },
    {
        id: 8,
        items: [
            { id: 1, quantity: 2 },
            { id: 2, quantity: 1 },
        ],
        distinctItemsCount: 2,
        totalItemsCount: 3,
        couponCode: "SAVE20",
        cartTotal: 200,
        finalAmount: 160,
        discountAmount: 40,
        userId: 4,
    },
    {
        id: 9,
        items: [
            { id: 1, quantity: 2 },
            { id: 2, quantity: 1 },
        ],
        distinctItemsCount: 2,
        totalItemsCount: 3,
        couponCode: "FREESHIP",
        cartTotal: 200,
        finalAmount: 195,
        discountAmount: 5,
        userId: 1,
    },
    {
        id: 10,
        items: [
            { id: 1, quantity: 2 },
            { id: 2, quantity: 1 },
        ],
        distinctItemsCount: 2,
        totalItemsCount: 3,
        couponCode: "SAVE10",
        cartTotal: 200,
        finalAmount: 180,
        discountAmount: 20,
        userId: 3,
    },
]

export const ordersPlacedByUser = (userId: number) => {
    return totalOrders.filter((order) => order.userId === userId)
}
