import "./globals.css";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Live Machine App",
  description: "Next.js with Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" text-gray-900">
        <NavBar />
        <main className="mx-4">{children}</main>
      </body>
    </html>
  );
}
