// app/layout.tsx
import './globals.css'; // Ensure your global styles are imported

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>My Dashboard App</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
