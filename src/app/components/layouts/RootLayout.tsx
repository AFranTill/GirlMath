import { Outlet } from "react-router";
import { LeftSidebar } from "../navigation/LeftSidebar";

export function RootLayout() {
  return (
    <div className="flex min-h-screen bg-[#EEEBE3]">
      <LeftSidebar />
      <main className="flex-1 ml-64 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
