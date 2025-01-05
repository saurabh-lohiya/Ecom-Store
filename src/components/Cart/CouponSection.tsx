
import { FC, useState } from "react"
import { type ICart } from "../../interface"
import { useCart } from "../../hooks/useCart"
import { ICoupon } from "../../data/coupons"

interface CouponErrorProps {
    error: string
}

interface CouponSuccessProps {
    couponCode: ICart['couponCode']
}

const CouponError: FC<CouponErrorProps> = ({ error }) => {
    return <div className="text-red-500 text-sm mt-1">{error}</div>
}

const CouponSuccess: FC<CouponSuccessProps> = ({ couponCode }) => {
    return couponCode ? (
        <div className="text-green-500 text-sm mt-1">{`Applied "${couponCode}" Successfully!`}</div>
    ) : (
        " "
    )
}

const CouponSection: FC = () => {
    const {
        cart: { couponCode: cartCouponCode },
        handleApplyCoupon,
        handleRemoveCoupon,
    } = useCart()
    const [couponError, setCouponError] = useState("")
    const [couponCode, setCouponCode] = useState("")
    const applyCoupon = async () => {
        try {
            await handleApplyCoupon(couponCode as ICoupon)
            setCouponError("")
            setCouponCode("")
        } catch (error: any) {
            setCouponError(error.message)
        }
    }

    return (
        <div className="flex flex-col items-start w-full p-4">
            <div className="flex items-center mt-2">
                <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="border border-gray-300 p-2 rounded w-full"
                />
                <button
                    onClick={applyCoupon}
                    className={`ml-2 bg-blue-500 text-white px-4 py-2 rounded ${
                        !!cartCouponCode && "cursor-not-allowed opacity-50 bg-gray-500"
                    }`}
                    disabled={!!cartCouponCode}
                >
                    Apply
                </button>
            </div>
            {(couponError || cartCouponCode) && (
                <div className="flex items-center mt-2 sm:mt-4 min-h-[2.5rem]">
                    {couponError && <CouponError error={couponError} />}
                    {cartCouponCode && !couponError && (
                        <CouponSuccess couponCode={cartCouponCode} />
                    )}
                    {cartCouponCode && !couponError && (
                        <button
                            onClick={handleRemoveCoupon}
                            className="ml-2 text-red-500 text-sm"
                        >
                            Remove
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default CouponSection