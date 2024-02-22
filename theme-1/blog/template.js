
import "./index.css";
import { Inter, Manrope } from "next/font/google";
import { cx } from "./components/Blogs/utils/helper";
import Header from "./components/Blogs/Header";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-in",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mr",
});
export default function RootLayout({ children }) {
  const classes = cx(
    inter.variable,
    manrope.variable,
    "font-mr bg-light dark:bg-dark"
  );
  return (
    <html lang="en" className="">
      <body id="blog" className={classes}>
        <div>
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
