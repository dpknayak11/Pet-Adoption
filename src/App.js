import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Pages
import Home from './pages/Home';
import PetDetails from './pages/PetDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ManagePets from './pages/ManagePets';
import Applications from './pages/Applications';

import { onMessageListener } from "./firebase";
import { useEffect } from 'react';

function App() {
useEffect(() => {
  onMessageListener()
    .then((payload) => {
      console.log("Foreground Notification:", payload);

     alert(`${payload.notification.title}\n\n${payload.notification.body}`);
      // Manual browser notification show
      new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: "/logo121.png",
      });
    })
    .catch((err) => console.log("Listener Error:", err));
}, []);


  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1 py-4">
          <div className="container">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/pet/:id" element={<PetDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* User Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Admin Protected Routes */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/pets"
                element={
                  <AdminRoute>
                    <ManagePets />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/applications"
                element={
                  <AdminRoute>
                    <Applications />
                  </AdminRoute>
                }
              />

              {/* Catch all - redirect to home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
        </main>
      </div>
        {/* </main> */}
        <Footer />
      {/* </div> */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Router>
  );
}

export default App;
