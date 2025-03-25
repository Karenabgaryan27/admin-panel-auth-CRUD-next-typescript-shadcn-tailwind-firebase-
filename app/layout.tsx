import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "@/styles/index.css";
import Provider from "@/contexts/context";
import AuthProvider from "@/contexts/AuthContext";
import ApiProvider from "@/contexts/ApiContext";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

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
  title: "Home",
  description: "Home page description.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <ApiProvider>
            <Provider>
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                {children}
              </ThemeProvider>
              <Toaster />
            </Provider>
          </ApiProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
