import React from "react"
import { useForm } from "../hooks"

interface FormFieldProps {
    label: string
    id: string
    type: string
    min?: number
    registerField: ReturnType<typeof useForm>["registerField"]
    validationRules: Array<(value: string, values?: unknown) => string | undefined>
    error: string | undefined
    placeholder: string
    className?: string
    options?: Array<{ value: string; label: string }> 
}

const FormField: React.FC<FormFieldProps> = ({
    label,
    id,
    type,
    min,
    registerField,
    validationRules,
    error,
    placeholder,
    className,
    options, // Destructure options
}) => {
    return (
        <div className={`flex flex-col items-start gap-1 ${className}`}>
            <label htmlFor={id} className="mb-1">
                {label}
            </label>
            {type === "textarea" ? (
                <textarea
                    id={id}
                    {...registerField(id, validationRules)}
                    placeholder={placeholder}
                    className={`w-full border ${
                        error ? "border-red-500" : "border-gray-300"
                    } p-2 rounded`}
                    value={registerField(id, validationRules).value} // Use value prop
                />
            ) : type === "select" && options ? ( // Handle select type
                <select
                    id={id}
                    {...registerField(id, validationRules)}
                    className={`w-full border ${
                        error ? "border-red-500" : "border-gray-300"
                    } p-2 rounded`}
                    value={registerField(id, validationRules).value} // Use value prop
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    id={id}
                    type={type}
                    min={type === "number" ? min : undefined}
                    {...registerField(id, validationRules)}
                    placeholder={placeholder}
                    className={`w-full border ${
                        error ? "border-red-500" : "border-gray-300"
                    } p-2 rounded`}
                    value={registerField(id, validationRules).value} // Use value prop
                />
            )}
            <div className="text-xs text-red-500 min-h-[1rem]">
                {error}
            </div>
        </div>
    )
}

export default FormField
