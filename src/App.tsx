import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import Header from "./components/Header"
import Banner from "./components/Banner"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import ModalWrapper from "./components/Modal/ModalWrapper"
import Orders from "./components/Orders"
import UserProtected from "./protected/UserProtected"

const App = () => {
    return (
        <>
            <Router>
                <Header />
                <ModalWrapper />
                <Banner />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route
                        path="/orders"
                        element={
                            <UserProtected>
                                <Orders />
                            </UserProtected>
                        }
                    />
                </Routes>
            </Router>
            <Footer />
        </>
    )
}

export default App
