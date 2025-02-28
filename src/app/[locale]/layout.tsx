import type {Metadata, Viewport} from "next";
import PageMenu from "@/components/page-menu/PageMenu";
import Header from "@/components/header/Header";
import "../globals.scss";
import SmoothScrolling from "@/app/SmoothScrolling";
import ModalMenu from "@/components/_modals/modal-menu/ModalMenu";
import ModalContacts from "@/components/_modals/modal-contacts/ModalContacts";
import App from "@/app/App";
import {LangType} from "@/types";

export const viewport: Viewport= {
  width: "derive-width",
  height: "derive-height",
  initialScale: 1
}

export default function RootLayout({
  children,
    params
}: Readonly<{
  children: React.ReactNode;
  params:{locale: LangType}
}>) {
  return (
    <html lang={params.locale}>
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
