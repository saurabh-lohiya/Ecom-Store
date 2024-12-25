const Footer = () => {
    return (
        <footer className="w-full bg-tertiary text-white py-6">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between">
                <div className="mb-4 md:mb-0">
                    <span className="text-xl font-bold">HealthStore</span>
                </div>
                <div className="flex space-x-4">
                    <a href="#" className="hover:text-secondary">Facebook</a>
                    <a href="#" className="hover:text-secondary">Twitter</a>
                    <a href="#" className="hover:text-secondary">Instagram</a>
                </div>
            </div>
            <div className="mt-4 text-center text-sm">
                &copy; 2024 HealthStore. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer