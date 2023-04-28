import type { AppProps } from "next/app";
import { ThemeProvider, Container } from "@mui/material";
import { GlobalStyle, theme } from "@/styles";
import { montserrat } from "@/styles/fonts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <header></header>
      <Container className={montserrat.className} maxWidth="lg">
        <Component {...pageProps} />
      </Container>
      <footer></footer>
      <GlobalStyle />
    </ThemeProvider>
  );
}
