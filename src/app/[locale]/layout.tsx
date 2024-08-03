import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import {NextIntlClientProvider} from 'next-intl';
import { getMessages } from "next-intl/server";
import ReduxProvider from "../context/ReduxProvider"; 
import ToasterContext from "../context/ToasterProvider";
import Provider from "../context/AuthContext";

const poppins = Poppins({ subsets: ["latin"], weight: '400' });

export const metadata: Metadata = {
  title: "Papas Llenos | Delicious Fully Loaded Potatoes",
  description: "Papas Llenos offers a variety of delicious, fully loaded potatoes with customizable toppings. Order online for delivery or pickup. Located in [Your Location], we serve the best comfort food in town!",
  keywords: "loaded potatoes, customizable potatoes, comfort food, Papas Llenos, food delivery, best potatoes in [Your Location]",
  authors: "Papas Llenos" as any,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const messages = await getMessages();

  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
      <NextIntlClientProvider messages={messages}>
          <ReduxProvider>
            <Provider>
              <ToasterContext />
              {children}
            </Provider>
          </ReduxProvider>
        </NextIntlClientProvider>
        </body>
    </html>
  );
}
