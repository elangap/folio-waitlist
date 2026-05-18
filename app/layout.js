import "./globals.css";

export const metadata = {
  title: "Folio — AI Portfolio Builder",
  description: "Build a stunning portfolio in 5 minutes with AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}