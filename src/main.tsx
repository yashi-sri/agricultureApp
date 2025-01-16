// main.tsx or index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core"; // Import MantineProvider
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
