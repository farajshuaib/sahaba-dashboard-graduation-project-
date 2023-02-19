import React, { useEffect, useLayoutEffect, useState } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ethers } from "ethers";
import { ToastContainer } from "react-toastify";
import { persistor, store } from "../app/store";
import { Web3Provider } from "@ethersproject/providers";
import { useAppDispatch } from "app/hooks";
import LoadingScreen from "components/LoadingScreen";
import { isLoggedIn } from "app/account/actions";
import { useLocation, useRoutes } from "react-router-dom";
import router from "router";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { ar, en } from "../locales";


import "../styles/index.scss";
import "../styles/index.css";
import "react-toastify/dist/ReactToastify.css";


i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ar: {
      translation: ar,
    },
  },
  lng:
    localStorage.getItem("locale") || "ar", // if you're using a language detector, do not define the lng option
  fallbackLng:  "ar",

  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
});


const getLibrary = (provider: any): Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

interface Props {
  children: React.ReactNode;
}

const AuthState: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(isLoggedIn()).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};

const RenderRoutes = () => {
  const routes = useRoutes(router());
  return routes;
};

const Wrapper: React.FC = () => {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    document.body.dir = i18n.language == "en" ? "ltr" : "rtl";
    document.documentElement.lang = i18n.language;
    if (i18n.language == "ar") {
      document.body.style.fontFamily = "Tajawal, sans-serif";
    } else {
      document.body.style.fontFamily = "Inter, sans-serif";
    }
  }, [i18n.language]);

  useLayoutEffect(() => {
    document.documentElement?.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthState>
            <RenderRoutes />
          </AuthState>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </PersistGate>
      </Provider>
    </Web3ReactProvider>
  );
};

export default Wrapper;
