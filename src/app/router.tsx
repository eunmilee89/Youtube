import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import Watch from "../pages/Watch";
import Search from "../pages/Search";
import Channel from "../pages/Channel";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "watch", element: <Watch /> },
      { path: "results", element: <Search /> },
      { path: ":channelId", element: <Channel /> },
    ],
  },
]);
