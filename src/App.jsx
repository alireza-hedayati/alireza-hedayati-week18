import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import PageNotFound from "./pages/404";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <>
      <Routes>
         <Route path="/" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
       
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
