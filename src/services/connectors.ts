import { InjectedConnector } from "@web3-react/injected-connector"; // Injected (e.g. Metamask)

export const injected = new InjectedConnector({
  supportedChainIds: [1, 5],
});

export const connectors = {
  injected: injected,
};
