import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import OrderModalProvider from "./components/OrderModalProvider";
import AuthProvider from "./components/AuthProvider";

export const metadata: Metadata = {
  title: "Sleep Guard",
  description: "Small device. Full night's peace of mind.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <OrderModalProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </OrderModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
