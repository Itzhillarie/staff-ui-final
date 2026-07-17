import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),

  title: {
    default: "Innovation Management System",
    template: "%s | Innovation Management System",
  },

  description:
    "Enterprise Innovation Management Platform for idea submission, peer review, project implementation, gamification and impact evaluation.",

  applicationName: "Innovation Management System",

  keywords: [
    "Innovation",
    "Ideas",
    "Projects",
    "Dashboard",
    "Peer Review",
    "Gamification",
    "Enterprise",
    "Workflow",
    "Management System",
  ],

  authors: [
    {
      name: "Innovation Management Team",
    },
  ],

  creator: "Innovation Management Team",

  publisher: "Innovation Management Team",

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  openGraph: {
    title: "Innovation Management System",
    description:
      "Enterprise Innovation Management Platform.",
    siteName: "Innovation Management System",
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${inter.variable} bg-slate-100 font-sans antialiased`}
      >
        {/* Main Application */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          richColors
          closeButton
          expand
          duration={3500}
          visibleToasts={5}
          toastOptions={{
            style: {
              borderRadius: "14px",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}