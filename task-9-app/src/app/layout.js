import { Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Job Listing Application",
  description: "Find your next career opportunity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-montserrat`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
