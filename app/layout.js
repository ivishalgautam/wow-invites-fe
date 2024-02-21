import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import QueryClientProvider from "@/components/QueryClientProvider";

export const metadata = {
  title: "Wow invites",
  description: "wow invites",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${GeistSans.className}`}
      >
        <Toaster />
        <QueryClientProvider>
          <Navbar />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
