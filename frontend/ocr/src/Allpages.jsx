import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login           from "./pages/Login.jsx";
import Signup          from "./pages/Signup.jsx";
import Student         from "./pages/Student.jsx";
import Faculty         from "./pages/Faculty.jsx";
import ForgotPassword  from "./pages/ForgotPassword.jsx";

function Allpages() {
    return (
        <Router>
            <Routes>
                <Route path="/"                element={<Login />} />
                <Route path="/signup"          element={<Signup />} />
                <Route path="/Student"         element={<Student />} />
                <Route path="/faculty"         element={<Faculty />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="*"               element={<h1>404 Not Found</h1>} />
            </Routes>
        </Router>
    );
}
export default Allpages;
