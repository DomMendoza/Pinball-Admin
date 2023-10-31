import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import NavBar from "./components/NavBar";
import AdminPage from "./pages/AdminPage";
import AdminStats from "./pages/AdminStats";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminSearch from "./pages/AdminSearch";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="/stats" element={<AdminStats />} />
        <Route path="/search" element={<AdminSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
