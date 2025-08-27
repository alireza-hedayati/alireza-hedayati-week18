import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import PageNotFound from "./pages/404";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/" element={localStorage.getItem("token") ? <Navigate to="/dashboard" replace/>: <Navigate to="/login" replace/>}/>
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
