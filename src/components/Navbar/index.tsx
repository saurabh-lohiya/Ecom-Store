const Navbar = () => {

    return (
        <nav className="w-full bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="logo text-xl font-bold">
                            HealthStore
                        </div>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border rounded px-2 py-1"
                        />
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <a href="/" className="text-gray-700 hover:text-secondary">
                                Home
                            </a>
                            <a href="/shop" className="text-gray-700 hover:text-secondary">
                                Shop
                            </a>
                            <a href="/about" className="text-gray-700 hover:text-secondary">
                                About
                            </a>
                            <a href="/contact" className="text-gray-700 hover:text-secondary">
                                Contact
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
