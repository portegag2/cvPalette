import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ padding: 16, textAlign: "center", borderTop: "1px solid #eee" }}>
      <Link to="/app-color-palette">Ver paleta de colores de la aplicación</Link>
    </footer>
  );
}