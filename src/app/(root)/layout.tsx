import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header/header";

export const metadata: Metadata = {
  title: "Hospedaje El Rinconcito",
  description:
    "Descubre uno de los mejores hoteles en Jauja, con habitaciones cómodas y comfortables, visitanos y conoce que Jauja tiene para ofrecer",
  icons: {
    icon: "/images/favicon.png",
  },
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
