import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layouts/RootLayout";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Rent } from "./pages/Rent";
import { Bills } from "./pages/Bills";
import { Groceries } from "./pages/Groceries";
import { Scoreboard } from "./pages/Scoreboard";
import { Profile } from "./pages/Profile";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/app",
    Component: ProtectedRoute,
    children: [
      {
        Component: RootLayout,
        children: [
          { index: true, Component: Dashboard },
          { path: "rent", Component: Rent },
          { path: "bills", Component: Bills },
          { path: "groceries", Component: Groceries },
          { path: "scoreboard", Component: Scoreboard },
          { path: "profile", Component: Profile },
        ],
      },
    ],
  },
]);
