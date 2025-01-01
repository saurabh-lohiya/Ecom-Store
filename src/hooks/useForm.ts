import { ChangeEvent, FormEvent, useState } from "react"

export function required<T extends string>(fieldName: string): (value: T) => string | undefined {
    return (value: T) => (value ? undefined : `${fieldName} is required`)
}

export function pattern<T extends string>(
    regex: RegExp,
    message: string
): (value: T) => string | undefined {
    return (value: T) => (regex.test(value) ? undefined : message)
}

export function matchField<T extends Record<string, unknown>>(
    fieldToMatch: keyof T,
    message: string
): (value: string, values?: T) => string | undefined {
    return (value: string, values?: T) => {
        return values && value === values[fieldToMatch] ? undefined : message
    }
}

export function minLength<T extends string>(
    length: number,
    message: string
): (value: T) => string | undefined {
    return (value: T) => (value.length >= length ? undefined : message)
}

export default function useForm<T extends Record<string, unknown>>(initialValues: T) {
    const [values, setValues] = useState<T>(initialValues)
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setValues((prev) => ({ ...prev, [name]: value }))
    }

    function registerField(
        name: keyof T,
        validators?: Array<(value: string, values?: T) => string | undefined>
    ) {
        return {
            name,
            value: values[name] || "",
            onChange: handleChange,
            onBlur: () => {
                if (validators && validators.length > 0) {
                    const error = validators
                        .map(validate => validate(values[name] as unknown as string, values))
                        .find(errorMsg => errorMsg !== undefined)
                    setErrors((prev) => ({ ...prev, [name]: error || "" }))
                }
            },
            error: errors[name as string],
        }
    }

    async function handleSubmit(
        e: FormEvent<HTMLFormElement>,
        callback: () => Promise<void>
    ) {
        e.preventDefault()
        const newErrors: { [key: string]: string } = {}

        // Example validation logic
        for (const key in values) {
            if (values[key] === "") {
                newErrors[key] = `${key} is required`
            }
        }

        setErrors(newErrors)

        if (Object.keys(newErrors).length === 0) {
            await callback()
            resetForm()
        }
    }

    function resetForm() {
        setValues(initialValues)
    }

    return {
        values,
        handleChange,
        handleSubmit,
        resetForm,
        registerField,
        errors,
    }
}