import React, { FC } from "react"
import { useCart } from "../../hooks/useCart"
import useForm, { required, minLength, pattern } from "../../hooks/useForm"
import { useNavigate } from "react-router-dom"

const Orders: FC = () => {
    const { cart, handleClearCart, handleRemoveCoupon } = useCart()
    const navigate = useNavigate()
    const { handleSubmit, registerField, errors } = useForm({
        name: "",
        address: "",
        city: "",
        postalCode: "",
        contact: "",
    })

    const placeOrder = async () => {
        // Implement actual order submission logic here
        // Example: await submitOrder({ ...values, cart })
        // For now, we'll simulate with a timeout
        await new Promise((resolve) => setTimeout(resolve, 1000))
        handleClearCart()
        if (cart.couponCode) {
            handleRemoveCoupon()
        }
    }
    
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        handleSubmit(e, async () => {
            const res: any = await placeOrder()
            if (res.ok) {
                alert("Order placed successfully!")
                navigate("/")
            }
        })
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...registerField("name", [
                            required("Name"),
                            minLength(3, "Name must be at least 3 characters"),
                        ])}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter your name"
                    />
                    <div className="text-red-500 text-sm min-h-[1.25em]">
                        {errors.name ? errors.name : " "}
                    </div>
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        {...registerField("address", [required("Address")])}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter your address"
                    />
                    <div className="text-red-500 text-sm min-h-[1.25em]">
                        {errors.address ? errors.address : " "}
                    </div>
                </div>
                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        {...registerField("city", [required("City")])}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter your city"
                    />
                    <div className="text-red-500 text-sm min-h-[1.25em]">
                        {errors.city ? errors.city : " "}
                    </div>
                </div>
                <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                        Postal Code
                    </label>
                    <input
                        type="text"
                        id="postalCode"
                        {...registerField("postalCode", [
                            required("Postal Code"),
                            pattern(/^\d{5}(-\d{4})?$/, "Invalid postal code"),
                        ])}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter your postal code"
                    />
                    <div className="text-red-500 text-sm min-h-[1.25em]">
                        {errors.postalCode ? errors.postalCode : " "}
                    </div>
                </div>
                <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                        Contact Number
                    </label>
                    <input
                        type="tel"
                        id="contact"
                        {...registerField("contact", [
                            required("Contact Number"),
                            pattern(/^\+?[1-9]\d{1,14}$/, "Invalid contact number"),
                        ])}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter your contact number"
                    />
                    <div className="text-red-500 text-sm min-h-[1.25em]">
                        {errors.contact ? errors.contact : " "}
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    {cart.couponCode && (
                        <div className="text-green-500">Coupon "{cart.couponCode}" applied.</div>
                    )}
                    <span className="text-xl font-semibold">
                        Total: ${cart.total.toFixed(2)}
                    </span>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Place Order
                </button>
            </form>
        </div>
    )
}

export default Orders