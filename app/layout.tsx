import "./global.css";
import { ReactNode } from "react";

export const metadata = {
  title: `Genoma Games Landing`,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
