export type ICoupon = "SAVE10" | "SAVE20" | "FREESHIP"

export const couponsDiscountMap: Record<ICoupon, number> = {
    SAVE10:  10 ,
    SAVE20:  20 ,
    FREESHIP:  5 ,
}