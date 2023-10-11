import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/utils/provider";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EZ-FORMS",
  description: "Generate | Print | Submit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Providers>
          <body className={inter.className}>{children}</body>
        </Providers>
      </html>
    </ClerkProvider>
  );
}
