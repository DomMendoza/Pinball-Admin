import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import NavBar from "./components/NavBar";
import AdminPage from "./pages/AdminPage";
import AdminStats from "./pages/AdminStats";
import AdminSearch from "./pages/AdminSearch";
import AdminBets from "./pages/AdminBets";
import AdminGameHistory from "./pages/AdminGameHistory";
import AdminTransaction from "./pages/AdminTransaction";
import LoginPage from "./pages/LoginPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/live" element={<AdminPage />} />
        <Route path="/stats" element={<AdminStats />} />
        <Route path="/bets" element={<AdminBets />} />
        <Route path="/search" element={<AdminSearch />} />
        <Route path="/history" element={<AdminGameHistory />} />
        <Route path="/transaction" element={<AdminTransaction />} />
      </Routes>
    </Router>
  );
}

export default App;
