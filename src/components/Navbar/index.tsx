import { useAuth } from "../../hooks/useAuth"

const Navbar = () => {
    const { userState } = useAuth()
    const isAuthenticated = userState.isAuthenticated
    
    return (
        <nav className="w-full bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="logo text-xl font-bold">HealthStore</div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border rounded px-2 py-1 min-w-[50vw] outline-none"
                    />
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                        {!isAuthenticated ? (
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <a href="#" className="text-gray-800">
                                    Sign Up
                                </a>
                                <a href="#" className="text-gray-800">
                                    Login
                                </a>
                            </div>
                        ) : (
                            <a href="#" className="text-gray-800">
                                Profile
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
