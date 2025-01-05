import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import "./App.css"
import Header from "./components/Header"
import Banner from "./components/Banner"
import Footer from "./components/Footer"
import ModalWrapper from "./components/Modal/ModalWrapper"
import UserRoutes from "./routes/UserRoutes"
import AdminRoutes from "./routes/AdminRoutes"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"

const App = () => {
    return (
        <div className="w-full h-full min-h-screen flex flex-col">
            <Router>
                <Header />
                <ModalWrapper />
                <Banner />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
                <UserRoutes />
                <AdminRoutes />
                <Footer />
            </Router>
        </div>
    )
}

export default App
