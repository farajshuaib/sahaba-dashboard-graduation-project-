import React, { useEffect } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ethers } from "ethers";
import { ToastContainer } from "react-toastify";
import { persistor, store } from "../app/store";
import { Web3Provider } from "@ethersproject/providers";

//
import "../styles/index.css";
import "react-toastify/dist/ReactToastify.css";

const getLibrary = (provider: any): Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

interface Props {
  children: React.ReactNode;
}
const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
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
