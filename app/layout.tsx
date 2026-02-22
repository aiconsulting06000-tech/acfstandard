import "../src/app/globals.css";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";

export const metadata = {
  title: "Agentic Commerce Framework — ACF Standard",
  description: "ACF Standard — governance methodology for autonomous agentic systems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="acf-bg acf-text antialiased">
        <Navbar />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
