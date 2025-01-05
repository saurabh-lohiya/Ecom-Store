import { useState } from "react"
import {required, useForm} from "../../hooks"
import FormField from "../../forms/FormField"

const DiscountCodes = () => {
    const { values, resetForm, registerField, errors } = useForm({
        discountCode: "",
        discountPercentage: "",
    })
    const [generatedCode, setGeneratedCode] = useState("")

    const generateDiscountCode = () => {
        fetch("/api/admin/discount-codes/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                discountCode: values.discountCode,
                discountPercentage: values.discountPercentage,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setGeneratedCode(data.code)
                resetForm()
            })
            .catch((error) => console.error(error))
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Generate Discount Code</h2>
            <div className="space-y-4">
                <FormField
                    label="Discount Code"
                    id="discountCode"
                    type="text"
                    registerField={registerField}
                    validationRules={[
                        required("Discount code is required"),
                    ]}
                    error={errors.discountCode}
                    placeholder="Enter discount code"
                />
                <FormField
                    label="Discount Percentage"
                    id="discountPercentage"
                    type="number"
                    registerField={registerField}
                    validationRules={[
                        required("Discount percentage is required"),
                    ]}
                    min={1}
                    error={errors.discountPercentage}
                    placeholder="Enter discount percentage"
                />
                <button
                    onClick={generateDiscountCode}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Generate Discount Code
                </button>
            </div>
            {generatedCode && (
                <div className="mt-6 p-4 bg-green-100 border border-green-200 rounded">
                    <h3 className="text-lg font-medium text-green-800">Your Discount Code:</h3>
                    <p className="mt-2 text-xl font-semibold text-green-900">{generatedCode}</p>
                </div>
            )}
        </div>
    )
}

export default DiscountCodes
