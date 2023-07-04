import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/header";
import Footer from "../components/footer";
import { AuhtProvider } from "@/providers/auth";                                 
        

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Motors Shop",
  description:
    "Bem vindos(a) a Motors Shop, uma plataforma voltada a simular a  compra e venda de automoveis. Inspirada na plataforma Webmotors criamos um site sofisticado, simples e intuitivo para fácil utilização e manuseio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <AuhtProvider>
          <Header />
          <div className="h-full">{children}</div>
          <Footer />
        </AuhtProvider>
      </body>
    </html>
  );
}
