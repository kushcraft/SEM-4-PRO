import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

function Allpages() {
    return (
        <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
        </Router>
    );
}

export default Allpages;
