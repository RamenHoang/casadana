import "./globals.css";
import { LangProvider } from "./LangContext";

export const metadata = {
  title: "Casadana Homestay — Your cozy home in Da Nang",
  description:
    "A warm retreat in the heart of Da Nang — cozy rooms, local charm, and hospitality that feels like family.",
  icons: {
    icon: "/assets/favicon.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Dancing+Script:wght@500;600;700&family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
