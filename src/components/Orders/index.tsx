import React, { FC } from "react"
import { useCart } from "../../hooks/useCart"
import useForm, { required, minLength, pattern } from "../../hooks/useForm"
import { useNavigate } from "react-router-dom"
import FormField from "../../forms/FormField"

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
            <form onSubmit={onSubmit} className="flex flex-col gap-1">
                <FormField
                    label="Name"
                    id="name"
                    type="text"
                    registerField={registerField}
                    validationRules={[
                        required("Name"),
                        minLength(3, "Name must be at least 3 characters"),
                    ]}
                    error={errors.name}
                    placeholder="Enter your name"
                />
                
                <FormField
                    label="Address"
                    id="address"
                    type="text"
                    registerField={registerField}
                    validationRules={[required("Address")]}
                    error={errors.address}
                    placeholder="Enter your address"
                />

                <FormField
                    label="City"
                    id="city"
                    type="text"
                    registerField={registerField}
                    validationRules={[required("City")]}
                    error={errors.city}
                    placeholder="Enter your city"
                />

                <FormField
                    label="Postal Code"
                    id="postalCode"
                    type="text"
                    registerField={registerField}
                    validationRules={[
                        required("Postal Code"),
                        pattern(/^\d{5}(-\d{4})?$/, "Invalid postal code"),
                    ]}
                    error={errors.postalCode}
                    placeholder="Enter your postal code"
                />

                <FormField
                    label="Contact Number"
                    id="contact"
                    type="tel"
                    registerField={registerField}
                    validationRules={[
                        required("Contact Number"),
                        pattern(/^\+?[1-9]\d{1,14}$/, "Invalid contact number"),
                    ]}
                    error={errors.contact}
                    placeholder="Enter your contact number"
                />

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