import { Outlet } from "react-router";
import { LeftSidebar } from "../navigation/LeftSidebar";

export function RootLayout() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-[#ebdebe] via-white to-[#f7c884]/30">
      <LeftSidebar />
      <main className="flex-1 ml-64 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
