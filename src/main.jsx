import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import ReactDOM from "react-dom/client";
import './index.css'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
