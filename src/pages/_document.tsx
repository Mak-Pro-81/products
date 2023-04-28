import { Html, Head, Main, NextScript } from "next/document";
import { montserrat } from "@/styles/fonts";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={montserrat.className}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
