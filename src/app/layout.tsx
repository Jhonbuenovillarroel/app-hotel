import type { Metadata } from "next";
import "./globals.css";
import { raleway } from "@/fonts/fonts";
import { cn } from "@/lib/utils";
import ThemeProvider from "@/components/Providers/ThemeProvider/theme-provider";
import AuthProvider from "@/components/Providers/AuthProvider/auth-provider";
import { Toaster } from "react-hot-toast";

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
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          `min-h-screen bg-zinc-100 dark:bg-zinc-950 antialiased`,
          raleway.className
        )}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
