import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@fontsource-variable/inter/wght.css";
import { AuthProvider } from "./features/auth/context/AuthContext.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const savedTheme = localStorage.getItem("trackrr-theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
);
