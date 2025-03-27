import { Epilogue } from "next/font/google";
import "./globals.css";

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
});

export const metadata = {
  title: "Job Listing Application",
  description: "Find your next career opportunity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${epilogue.variable} font-epilogue antialiased`}>
        {children}
      </body>
    </html>
  );
}
