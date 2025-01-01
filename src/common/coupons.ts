interface Coupon {
    discount: number // Percentage discount
}

export const coupons: Record<string, Coupon> = {
    SAVE10: { discount: 10 },
    SAVE20: { discount: 20 },
    FREESHIP: { discount: 5 }, // Example: 5% discount for free shipping
}