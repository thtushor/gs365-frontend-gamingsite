import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./contexts/auth-context.tsx";
import PullToRefresh from "./components/Shared/DraggRefreshButton.tsx";


// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
    mutations: {
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PullToRefresh children={null} />
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastContainer />
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
