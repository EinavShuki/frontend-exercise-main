import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} exact />
      </Routes>
    </Router>
  );
}

export default App;
