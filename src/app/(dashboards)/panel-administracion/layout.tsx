import type { Metadata } from "next";
import "../../globals.css";
import SideBar from "./_components/SideBar/sidebar";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full h-full">
      <SideBar />
      {children}
    </div>
  );
}
