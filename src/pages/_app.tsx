import "styles/globals.css";
import "antd/dist/reset.css";
import "react-toastify/dist/ReactToastify.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useStore, { IStore } from "store";

import type { AppProps } from "next/app";
import ConfigProvider from "components/ConfigProvider";
import { HashLoader } from "react-spinners";
import { IntlProvider } from "react-intl";
import Template from "components/Template";
import { ToastContainer } from "react-toastify";
import enANTD from "antd/lib/locale/en_US";
import idANTD from "antd/lib/locale/id_ID";
import intlEN from "lang/locale-en.json";
import intlID from "lang/locale-id.json";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const store: IStore = useStore();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const { lang } = store;

  let currentLanguageMessage = lang === "id" ? intlID : intlEN;
  let selectedLocaleAntd = lang === "id" ? idANTD : enANTD;

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleStop = () => {
      setIsLoading(false);
    };

    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleStop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  function Root() {
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
      setShowChild(true);
    }, []);

    if (showChild) {
      if (router.pathname === "/login") {
        return <Component {...pageProps} />;
      } else {
        return (
          <Template>
            <Component {...pageProps} />
          </Template>
        );
      }
    } else {
      return null;
    }
  }

  return (
    <IntlProvider
      messages={currentLanguageMessage}
      locale={lang}
      defaultLocale="en"
    >
      <QueryClientProvider client={queryClient}>
        {isLoading && (
          <div className="fixed z-50 w-screen h-screen flex justify-center items-center bg-brandViolet opacity-95 duration-700 overflow-hidden">
            <HashLoader color="white" className="m-auto" size={100} />
          </div>
        )}
        <div className="light relative">
          <ToastContainer bodyClassName="font-poppins text-sm" />
        </div>
        <ConfigProvider locale={selectedLocaleAntd}>{Root()}</ConfigProvider>
      </QueryClientProvider>
    </IntlProvider>
  );
}
