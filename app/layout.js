import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import QueryClientProvider from "@/components/QueryClientProvider";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Wow invites",
  description: "wow invites",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${GeistSans.className} h-screen`}
      >
        <Toaster />
        <QueryClientProvider>
          <Navbar />
          <main className="h-[calc(100vh-80px)]">
            {children} <Footer />
          </main>
        </QueryClientProvider>
      </body>
    </html>
  );
}
