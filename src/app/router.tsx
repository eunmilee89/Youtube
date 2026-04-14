import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import Watch from "../pages/Watch";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "watch", element: <Watch /> },
    ],
  },
]);
