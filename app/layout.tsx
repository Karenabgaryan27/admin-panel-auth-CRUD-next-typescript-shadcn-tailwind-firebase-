import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "@/styles/index.css";
import Provider from "@/contexts/context";
import AuthProvider from "@/contexts/AuthContext";
import ApiProvider from "@/contexts/ApiContext";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "CRM Admin Panel — oversee and manage all your CRM operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <ApiProvider>
            <Provider>
              {children}
              <Toaster />
            </Provider>
          </ApiProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
