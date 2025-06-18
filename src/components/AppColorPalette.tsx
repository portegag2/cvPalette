import React, { useState } from "react";

const colors = [
  {
    variable: "--background",
    usage: "Fondo principal",
    value: "hsl(0 0% 100%)",
  },
  {
    variable: "--foreground",
    usage: "Texto principal",
    value: "hsl(222.2 84% 4.9%)",
  },
  {
    variable: "--muted",
    usage: "Fondos secundarios",
    value: "hsl(210 40% 96.1%)",
  },
  {
    variable: "--muted-foreground",
    usage: "Texto en fondos secundarios",
    value: "hsl(215.4 16.3% 46.9%)",
  },
  {
    variable: "--border",
    usage: "Bordes y divisores",
    value: "hsl(214.3 31.8% 91.4%)",
  },
  {
    variable: "--input",
    usage: "Fondos de inputs",
    value: "hsl(210 40% 98%)",
  },
  {
    variable: "--primary",
    usage: "Color principal (botones, links)",
    value: "hsl(222.2 47.4% 11.2%)",
  },
  {
    variable: "--primary-foreground",
    usage: "Texto sobre color principal",
    value: "hsl(210 40% 98%)",
  },
  {
    variable: "--secondary",
    usage: "Elementos secundarios",
    value: "hsl(210 40% 96.1%)",
  },
  {
    variable: "--secondary-foreground",
    usage: "Texto sobre secundarios",
    value: "hsl(222.2 47.4% 11.2%)",
  },
  {
    variable: "--accent",
    usage: "Acentos (iconos, detalles)",
    value: "hsl(263.4 70% 50.4%)",
  },
  {
    variable: "--accent-foreground",
    usage: "Texto sobre acento",
    value: "hsl(210 40% 98%)",
  },
  {
    variable: "--destructive",
    usage: "Errores, advertencias",
    value: "hsl(0 84.2% 60.2%)",
  },
  {
    variable: "--destructive-foreground",
    usage: "Texto sobre error",
    value: "hsl(210 40% 98%)",
  },
];

const sugeridos = {
  "--background": "#F9F9FB",
  "--foreground": "#2D2D2D",
  "--muted": "#E0F7FA",
  "--muted-foreground": "#607D8B",
  "--border": "#B0BEC5",
  "--input": "#F1F8FF",
  "--primary": "#00D4AA",
  "--primary-foreground": "#FFFFFF",
  "--secondary": "#E91E63",
  "--secondary-foreground": "#FFFFFF",
  "--accent": "#673AB7",
  "--accent-foreground": "#FFFFFF",
  "--destructive": "#FF5722",
  "--destructive-foreground": "#FFFFFF",
};

// HEX to HSL util
function hexToHSL(hex) {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  h = Math.round(h * 360 * 10) / 10;
  s = Math.round(s * 1000) / 10;
  l = Math.round(l * 1000) / 10;
  return `${h} ${s}% ${l}%`;
}

function hslToCssVar(hsl) {
  // Extrae sólo los números de hsl(222.2 47.4% 11.2%) => "222.2 47.4% 11.2%"
  const match = hsl.match(/hsl\(([^)]+)\)/);
  return match ? match[1] : hsl;
}

function applyTheme(theme, isClassic = false) {
  Object.entries(theme).forEach(([key, value]) => {
    let valStr = String(value);
    // Si es clásico, quita hsl()
    if (isClassic && valStr.startsWith("hsl")) {
      valStr = valStr.match(/hsl\\(([^)]+)\\)/)[1];
    }
    // Si es sugerido y es hex, pásalo a HSL string
    if (!isClassic && valStr.startsWith("#")) {
      valStr = hexToHSL(valStr);
    }
    document.documentElement.style.setProperty(key, valStr);
  });
}

const classicTheme = Object.fromEntries(colors.map((c) => [c.variable, c.value]));
const cvPaletteTheme = sugeridos;

export default function AppColorPalette() {
  const [active, setActive] = useState("classic");

  const handleTheme = (themeName) => {
    setActive(themeName);
    if (themeName === "classic") {
      applyTheme(classicTheme, true);
    } else {
      applyTheme(cvPaletteTheme, false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Paleta de colores de la aplicación</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Variable CSS</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Uso principal</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Valor</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>
              <a
                href="#"
                onClick={() => handleTheme("classic")}
                style={{
                  color: active === "classic" ? "#00D4AA" : undefined,
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Clásico
              </a>
            </th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>
              <a
                href="#"
                onClick={() => handleTheme("cvpalette")}
                style={{
                  color: active === "cvpalette" ? "#673AB7" : undefined,
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                CV Palette
              </a>
            </th>
          </tr>
        </thead>
        <tbody>
          {colors.map((color) => {
            const sugerido = sugeridos[color.variable] || "";
            return (
              <tr key={color.variable}>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>{color.variable}</td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>{color.usage}</td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>{color.value}</td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  <span
                    style={{
                      display: "inline-block",
                      width: 70,
                      height: 30,
                      background: color.value,
                      border: "1px solid #aaa",
                    }}
                  />
                </td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  {sugerido && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 70,
                        height: 30,
                        background: sugerido,
                        border: "1px solid #aaa",
                      }}
                      title={sugerido}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}