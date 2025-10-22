import { RouterProvider } from "react-router-dom"
import { router } from "./presentation/routes/router"

export const ReactGPT = () => {
  return <RouterProvider router={router} />;
};
