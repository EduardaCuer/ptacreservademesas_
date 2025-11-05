import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Registrar";
import Profile from "../pages/Perfil";
import EditProfile from "../pages/EditarPerfil";
import Tables from "../pages/Mesas";
import Reserve from "../pages/Reservar";
import MyReservations from "../pages/MinhasReservas";
import ProtectedRoute from "../components/ProtectedRoute";
import ConsultarMesas from "../pages/ConsultarMesas"; // 🔹 Import novo

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
            path="/consultar-mesas"
            element={
              <ProtectedRoute>
                <ConsultarMesas />
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
