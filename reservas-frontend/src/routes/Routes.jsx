import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import Tables from "../pages/Tables";
import Reserve from "../pages/Reserve";
import MyReservations from "../pages/MyReservations";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />

          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfil/editar"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mesas"
            element={
              <ProtectedRoute>
                <Tables />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reservar/:mesaId?"
            element={
              <ProtectedRoute>
                <Reserve />
              </ProtectedRoute>
            }
          />

          <Route
            path="/minhas-reservas"
            element={
              <ProtectedRoute>
                <MyReservations />
              </ProtectedRoute>
            }
          />

        </Routes>
      </main>
    </BrowserRouter>
  );
}
