import React from "react"
import useForm from "../hooks/useForm"

interface FormFieldProps {
    label: string
    id: string
    type: string
    registerField: ReturnType<typeof useForm>["registerField"]
    validationRules: Array<(value: string) => string | undefined>
    error: string
    placeholder: string
    className?: string
}
const FormField: React.FC<FormFieldProps> = ({
    label,
    id,
    type,
    registerField,
    validationRules,
    error,
    placeholder,
    className
}) => {
    return (
        <div className={`flex flex-col items-start gap-1 ${className}`}>
            <label htmlFor={id} className="mb-1">
                {label}
            </label>
            <input
                id={id}
                type={type}
                {...registerField(id, validationRules)}
                placeholder={placeholder}
                className={`w-full border ${
                    error ? "border-red-500" : "border-gray-300"
                } p-2 rounded`}
            />
            {
                <div className="text-xs text-red-500 min-h-[1rem]">
                    {error}
                </div>
            }
        </div>
    )
}

export default FormField
