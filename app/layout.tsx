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

// const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-website-name.vercel.app";

export const metadata: Metadata = {
  title: "Website",
  description: "Your website description",
  icons: {
    icon: [{ rel: "icon", url: "/assets/images/favicon.svg" }],
    apple: "/assets/images/favicon.svg",
  },
  // openGraph: {
  //   title: "Website",
  //   description: "Your site description.",
  //   url: `${siteUrl}`,
  //   siteName: "Website-page",
  //   images: [
  //     {
  //       url: `${siteUrl}/assets/images/og-image.jpg`,
  //       width: 612,
  //       height: 334,
  //       alt: "Your Website Logo",
  //     },
  //   ],
  //   locale: "en_US",
  //   type: "website",
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Website",
  //   description: "Your website description..",
  //   images: [
  //     {
  //       url: `${siteUrl}/assets/images/og-image.jpg`,
  //       width: 612,
  //       height: 334,
  //       alt: "Your Website Logo",
  //     },
  //   ],
  // },
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
