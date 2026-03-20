import "./globals.css";

export const metadata = {
  title: "Agentic Commerce Framework — ACF Standard",
  description: "ACF Standard — governance methodology for autonomous agentic systems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
