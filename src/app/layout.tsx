import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import  Navbar  from "@/components/NavBar"
import prisma from "@/app/lib/db";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {unstable_noStore as noStore} from "next/cache";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "MoleAlert",
  description: "MoleAlert uses computer vision to detect malignant melanoma.",
};

async function getData(userId: string) {
    noStore();
    if (userId) {
        const data = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                colorScheme: true,
            }
        });
        return data;
    }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${data?.colorScheme ?? 'theme-green'} ${geistMono.variable} antialiased`}
      >
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
          <Navbar />
          {children}
      </ThemeProvider>
      </body>
    </html>
  );
}
