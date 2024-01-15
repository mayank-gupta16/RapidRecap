import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/Header-Footer/Navbar.jsx";
import Home from "./screens/Home";
import About from "./screens/About";
import Signin from "./screens/Signin";
import Register from "./screens/Register";
import Contact from "./screens/Contact";
import Footer from "./components/Header-Footer/Footer.jsx";
import Article from "./screens/Article.jsx";
import Profile from "./screens/Profile.jsx";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/article/:id" element={<Article />} />
        <Route exact path="/about" element={<About />} />
<<<<<<< HEAD
        <Route exact path="/signin" element={<Sigin />} />
        <Route exact path="/profile" element={<Profile />} />
=======
        <Route exact path="/signin" element={<Signin />} />
>>>>>>> 11bd144ef83258df3e2f261d487c0d823fb3b5fe
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
