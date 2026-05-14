import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/AppRouter";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
