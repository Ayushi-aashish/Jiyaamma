import React from "react";
import ReactDOM from "react-dom/client";
import CarFinder from "./carf.jsx";
import "./index.css"; // for Tailwind or any other styles

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CarFinder />
  </React.StrictMode>
);
