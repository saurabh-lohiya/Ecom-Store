
import { useForm, required, pattern, minLength, matchField } from "../hooks"

const Signup = () => {
    const { registerField, handleSubmit, errors } = useForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    return (
        <form
            className="flex flex-col gap-1 items-start"
            onSubmit={(e) =>
                handleSubmit(e, async () => {
                    // Your signup logic here
                    // Example: await registerUser(values)
                })
            }
        >
            <input
                type="text"
                {...registerField("name", [
                    required("Name"),
                    minLength(2, "Name must be at least 2 characters"),
                ])}
                placeholder="Name"
                className="w-full border border-gray-300 p-2 rounded"
            />
            <span className="text-sm text-red-500 h-6">
                {errors.name}
            </span>
            <input
                type="email"
                {...registerField("email", [
                    required("Email"),
                    pattern(/\S+@\S+\.\S+/, "Email is invalid"),
                ])}
                placeholder="Email"
                className="w-full border border-gray-300 p-2 rounded"
            />
            <span className="text-sm text-red-500 h-6">
                {errors.email}
            </span>
            <input
                type="password"
                {...registerField("password", [
                    required("Password"),
                    minLength(6, "Password must be at least 6 characters"),
                ])}
                placeholder="Password"
                className="w-full border border-gray-300 p-2 rounded"
            />
            <span className="text-sm text-red-500 h-6">
                {errors.password}
            </span>
            <input
                type="password"
                {...registerField("confirmPassword", [
                    required("Confirm Password"),
                    matchField("password", "Passwords do not match"),
                ])}
                placeholder="Confirm Password"
                className="w-full border border-gray-300 p-2 rounded"
            />
            <span className="text-sm text-red-500 h-6">
                {errors.confirmPassword}
            </span>
            <button
                type="submit"
                className="w-full mt-2 bg-blue-500 text-white p-2 rounded"
            >
                Sign Up
            </button>
        </form>
    )
}

export default Signup