import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Hospedaje El Rinconcito",
  description:
    "Descubre uno de los mejores hoteles en Jauja, con habitaciones cómodas y comfortables, visitanos y conoce lo que Jauja tiene para ofrecer",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
