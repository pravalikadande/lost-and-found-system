import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LostItems from "./pages/LostItems";
import AddLostItem from "./pages/AddLostItem";
import AddFoundItem from "./pages/AddFoundItem";
import FoundItems from "./pages/FoundItems";
import ProtectedRoute from "./components/ProtectedRoute";
import MyLostItems from "./pages/MyLostItems";
import MyFoundItems from "./pages/MyFoundItems";
import Profile from "./pages/Profile";
import Claims from "./pages/Claims";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

       <Route
  path="/lost-items"
  element={
    <ProtectedRoute>
      <LostItems />
    </ProtectedRoute>
  }
/>

<Route
  path="/my-lost-items"
  element={
    <ProtectedRoute>
      <MyLostItems />
    </ProtectedRoute>
  }
/>

        <Route
  path="/add-lost-item"
  element={
    <ProtectedRoute>
      <AddLostItem />
    </ProtectedRoute>
  }
/>
        <Route
  path="/add-found-item"
  element={
    <ProtectedRoute>
      <AddFoundItem />
    </ProtectedRoute>
  }
/>

<Route
  path="/claims"
  element={
    <ProtectedRoute>
      <Claims />
    </ProtectedRoute>
  }
/>

        <Route
  path="/found-items"
  element={
    <ProtectedRoute>
      <FoundItems />
    </ProtectedRoute>
  }
/>

<Route
  path="/my-found-items"
  element={
    <ProtectedRoute>
      <MyFoundItems />
    </ProtectedRoute>
  }
/>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;