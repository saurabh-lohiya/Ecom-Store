
import Navbar from "../Navbar";

const Header = () => {
    return (
        <section className="w-full flex flex-col items-center bg-primary">
            <header className="w-full max-w-[90vw] flex justify-between items-center p-4">
                <Navbar />
            </header>
        </section>
    )
}

export default Header;
