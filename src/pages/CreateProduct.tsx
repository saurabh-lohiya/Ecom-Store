import React from "react"
import useForm, { required, minLength, pattern } from "../hooks/useForm"
import FormField from "../forms/FormField"
import { IWritableProduct } from "../interface"
import { productCategoryMap } from "../data/products"

const categoryOptions = [
    ...Object.keys(productCategoryMap).map((category) => ({
        value: category.toString(),
        label: productCategoryMap[category],
    })),
]

const CreateProduct = () => {
    const { registerField, handleSubmit, errors } = useForm<IWritableProduct>({
        title: "",
        description: "",
        categoryId: 0,
        price: 0,
        img: "",
    })

    const createProduct = async (productData: IWritableProduct) => {
        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            })

            if (response.ok) {
                alert("Product created successfully!")
                return response
                // Optionally, reset the form or navigate to another page
            } else {
                const errorData = await response.json()
                alert(`Error: ${errorData.message}`)
            }
        } catch (error: any) {
            alert(`Error: ${error.message}`)
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        handleSubmit(e, async () => {
            const formElements = e.currentTarget.elements as typeof e.currentTarget.elements & {
                title: HTMLInputElement
                description: HTMLTextAreaElement
                categoryId: HTMLSelectElement
                price: HTMLInputElement
                img: HTMLInputElement
            }

            const productData: IWritableProduct = {
                title: formElements.title.value,
                description: formElements.description.value,
                categoryId: parseInt(formElements.categoryId.value),
                price: parseFloat(formElements.price.value),
                img: formElements.img.value,
            }
            console.log(productData)
            const res = await createProduct(productData)
            if (res?.status === 201) {
                alert("Product created successfully!")
                // Optionally, navigate to another page without search params
                // navigate("/products")
            }
        })
    }

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Create New Product</h1>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <FormField
                    label="Product Title"
                    id="title"
                    type="text"
                    registerField={registerField}
                    validationRules={[
                        required("title"),
                        minLength(
                            3,
                            "Product title must be at least 3 characters"
                        ),
                    ]}
                    error={errors.title}
                    placeholder="Enter product title"
                />

                <FormField
                    label="Description"
                    id="description"
                    type="textarea"
                    registerField={registerField}
                    validationRules={[
                        required("Description"),
                        minLength(
                            10,
                            "Description must be at least 10 characters"
                        ),
                    ]}
                    error={errors.description}
                    placeholder="Enter product description"
                />

                <FormField
                    label="Category"
                    id="categoryId"
                    type="select"
                    registerField={registerField}
                    validationRules={[
                        required("categoryId"),
                        pattern(/^\d+$/, "Enter a valid Category Id"),
                    ]}
                    error={errors.categoryId}
                    placeholder="Select a category"
                    options={categoryOptions}
                />

                <FormField
                    label="Price"
                    id="price"
                    type="number"
                    min={0}
                    registerField={registerField}
                    validationRules={[
                        required("price"),
                        pattern(/^\d+(\.\d{1,2})?$/, "Enter a valid price"),
                    ]}
                    error={errors.price}
                    placeholder="Enter price"
                />

                <FormField
                    label="Image URL"
                    id="img"
                    type="text"
                    registerField={registerField}
                    validationRules={[
                        required("Image URL"),
                        pattern(
                            /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))/i,
                            "Enter a valid image URL"
                        ),
                    ]}
                    error={errors.img}
                    placeholder="Enter image URL"
                />

                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                    Create Product
                </button>
            </form>
        </div>
    )
}

export default CreateProduct
