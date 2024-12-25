import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import Header from "./components/Header"
import Banner from "./components/Banner"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"

const App = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Banner />
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </Router>
            <Footer />
        </div>
    )
}

export default App
