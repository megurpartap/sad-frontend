import "./App.css";
import ApplicationFormPage from "./pages/ApplicationFormPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationFormPage from "./pages/RegistrationFormPage";
import Layout from "./components/Layout/Layout";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./services/auth/auth";
import { login, logout } from "./store/authSlice";
import MemberDetailsPage from "./pages/MemberDetailsPage";

function App() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("this is inside app");
  //   authService.getCurrentUser().then((userData) => {
  //     console.log(userData);
  //     if (userData) {
  //       dispatch(login(userData));
  //     } else {
  //       dispatch(logout());
  //     }
  //   });
  // }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<ApplicationFormPage />} />
            <Route path="/register" element={<RegistrationFormPage />} />
            <Route
              path="/memberDetails/:memberId"
              element={<MemberDetailsPage />}
            />
            <Route path="/admin/">
              <Route path="dashboard" element={<AdminDashboardPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
