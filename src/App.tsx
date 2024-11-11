import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import AuthLayout from "./layout/AuthLayout";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import Profile from "./pages/Profile";
import { AuthProvider, useUser } from "./context/AuthContext";
import { ReactNode } from "react";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          </Route>
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useUser();

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default App;
