import type { AppProps } from "next/app";
import { SectionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SectionProvider>
      <Component {...pageProps} />
    </SectionProvider>
  );
}
