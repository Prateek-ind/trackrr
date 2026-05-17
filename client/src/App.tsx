import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/AppRouter";
import { ThemeProvider } from "@/components/Theme-Provider";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="trackrr-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
