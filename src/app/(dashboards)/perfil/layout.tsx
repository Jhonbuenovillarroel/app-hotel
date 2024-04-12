import type { Metadata } from "next";
import "../globals.css";
import SideBar from "./_components/SideBar/sidebar";

export const metadata: Metadata = {
  title: "Hospedaje El Rinconcito",
  description:
    "Descubre uno de los mejores hoteles en Jauja, con habitaciones cómodas y comfortables, visitanos y conoce que Jauja tiene para ofrecer",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <SideBar />
      {children}
    </div>
  );
}
