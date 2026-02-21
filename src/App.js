import React, { useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/header";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { AuthContext } from "./contexts/AuthContext";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Main from "./pages/Home/Main";
import Total from "./pages/Group/total";
import MeetingDetail from "./pages/Group/MeetingDetail";
import MeetingCreate from "./pages/Group/MeetingCreate";
import PostDetail from "./pages/Post/PostDetail";
import PostCreate from "./pages/Post/PostCreate";
import PostEdit from "./pages/Post/PostEdit";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  const hideHeader = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="web">
      {isAuthenticated && !hideHeader && <Header />}
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoute><Main /></ProtectedRoute>} />
        <Route path="/post/new" element={<ProtectedRoute><PostCreate /></ProtectedRoute>} />
        <Route path="/post/:id" element={<ProtectedRoute><PostDetail /></ProtectedRoute>} />
        <Route path="/post/:id/edit" element={<ProtectedRoute><PostEdit /></ProtectedRoute>} />
        <Route path="/group" element={<ProtectedRoute><Total /></ProtectedRoute>} />
        <Route path="/group/new" element={<ProtectedRoute><MeetingCreate /></ProtectedRoute>} />
        <Route path="/group/:meetingId" element={<ProtectedRoute><MeetingDetail /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
