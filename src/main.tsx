import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@/hooks/theme-hook.tsx";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { Toaster } from "./components/ui/sonner";
import router from "./routing/router";
import { AuthProvider } from "./context/auth-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: true, refetchOnMount: true },
  },
});

ReactDOM.createRoot(document.getElementById("app_root")!).render(
  <React.StrictMode>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
      <Toaster position="bottom-left" richColors duration={1500} />
    </ThemeProvider>
  </React.StrictMode>,
);
