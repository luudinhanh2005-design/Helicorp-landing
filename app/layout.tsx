import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HeLiCorp | Smart Pet Care Ecosystem",
  description:
    "HeLiCorp mang đến hệ sinh thái công nghệ chăm sóc thú cưng thông minh với các thương hiệu PETKIT, NEAKASA, PETREE và nhiều giải pháp hiện đại.",
  keywords: [
    "HeLiCorp",
    "PETKIT",
    "NEAKASA",
    "PETREE",
    "Pet Tech",
    "Smart Pet",
    "thú cưng thông minh",
    "chăm sóc thú cưng",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "HeLiCorp | Smart Pet Care Ecosystem",
    description:
      "Giải pháp công nghệ giúp chăm sóc thú cưng thông minh và tiện lợi hơn. Khám phá sản phẩm từ PETKIT, NEAKASA, PETREE.",
    type: "website",
    locale: "vi_VN",
    siteName: "HeLiCorp",
  },
  twitter: {
    card: "summary_large_image",
    title: "HeLiCorp | Smart Pet Care Ecosystem",
    description:
      "Giải pháp công nghệ giúp chăm sóc thú cưng thông minh và tiện lợi hơn.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {/* Prevent dark mode flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
