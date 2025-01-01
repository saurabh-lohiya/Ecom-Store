import useForm, { required, pattern } from "../hooks/useForm"

const Login = () => {
    const { registerField, handleSubmit, errors } = useForm({
        email: "",
        password: "",
    })

    return (
        <form
            className="flex flex-col gap-1 items-start"
            onSubmit={(e) =>
                handleSubmit(e, async () => {
                    // Your login logic here
                })
            }
        >
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
                {...registerField("password", [required("Password")])}
                placeholder="Password"
                className="w-full border border-gray-300 p-2 rounded"
            />
            <span className="text-sm text-red-500 h-6">
                {errors.password}
            </span>
            <button
                type="submit"
                className="w-full mt-2 bg-blue-500 text-white p-2 rounded"
            >
                Login
            </button>
        </form>
    )
}

export default Login
