import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LayoutWrapper from '@/components/LayoutWrapper';

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: "Your Name - Portfolio",
  description: "A personal portfolio for a researcher in computer animation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${space_grotesk.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="bg-white text-black antialiased dark:bg-gray-900 dark:text-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col justify-between min-h-screen">
            <LayoutWrapper>
              <Header />
              <main className="mb-auto">{children}</main>
            </LayoutWrapper>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
