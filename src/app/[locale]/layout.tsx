import type { Metadata } from "next";
import PageMenu from "@/components/page-menu/PageMenu";
import Header from "@/components/header/Header";
import "../globals.scss";
import SmoothScrolling from "@/app/SmoothScrolling";
import ModalMenu from "@/components/_modals/modal-menu/ModalMenu";
import ModalContacts from "@/components/_modals/modal-contacts/ModalContacts";
import App from "@/app/App";

export const metadata: Metadata = {
  title: "ДЕЛАЙ",
  description: "Generated by create next app",
  viewport:{
    width: "derive-width",
    height: "derive-height",
    initialScale: 1
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
      <SmoothScrolling>
        <App>
          {children}
        </App>
      </SmoothScrolling>
      </body>
    </html>
  );
}
