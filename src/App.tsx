import './App.scss';
import './trackers';
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dil from "./components/dil/dil";
import { TxForm } from "./components/TxForm/TxForm";
import MainPage from "./components/main/main";
import { LanguageProvider, useLanguage } from './components/LanguageContext';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { selectedLanguage } = useLanguage();

  if (!selectedLanguage) {
    return <Dil />; // Redirect to language selection if no language is selected
  }

  return children;
}

function App() {
  return (
    <TonConnectUIProvider
      manifestUrl="https://ton-connect.github.io/demo-dapp-with-wallet/tonconnect-manifest.json"
      uiPreferences={{ theme: THEME.DARK }}
      walletsListConfiguration={{
        includeWallets: [
          {
            appName: "tonwallet",
            name: "TON Wallet",
            imageUrl: "https://wallet.ton.org/assets/ui/qr-logo.png",
            aboutUrl: "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
            universalLink: "https://wallet.ton.org/ton-connect",
            jsBridgeKey: "tonwallet",
            bridgeUrl: "https://bridge.tonapi.io/bridge",
            platforms: ["chrome", "android"]
          },
          {
            appName: "nicegramWallet",
            name: "Nicegram Wallet",
            imageUrl: "https://static.nicegram.app/icon.png",
            aboutUrl: "https://nicegram.app",
            universalLink: "https://nicegram.app/tc",
            deepLink: "nicegram-tc://",
            jsBridgeKey: "nicegramWallet",
            bridgeUrl: "https://bridge.tonapi.io/bridge",
            platforms: ["ios", "android"]
          },
          {
            appName: "binanceTonWeb3Wallet",
            name: "Binance Web3 Wallet",
            imageUrl: "data:image/svg+xml;base64,++CjxwYXJyb3cgMTYuNjEyOUw4Ljg3MDk3IDE4Ljg3MUwxNSAyNUwyMS4xMjkgMTguODcxTDE4Ljg3MSAxNi42MTI5TDE1IDIwLjQ4MzlMMTEuMTI5IDE2LjYxMjlaIiBmaWxsPSIjRjBCOTBCIi8+CjxwYXRoIGQ9Ik0yMC40ODM5IDE1TDIyLjc0MTkgMTIuNzQxOUwyNSAxNUwyMi43NDE5IDE3LjI1ODFMMjAuNDgzOSAxNVoiIGZpbGw9IiNGMEI5MEIiLz4KPC9zdmc+Cg==",
            aboutUrl: "https://www.binance.com/en/web3wallet",
            deepLink: "bnc://app.binance.com/cedefi/ton-connect",
            bridgeUrl: "https://bridge.tonapi.io/bridge",
            platforms: ["chrome", "safari", "ios", "android"],
            universalLink: "https://app.binance.com/cedefi/ton-connect"
          },
          {
            appName: "fintopio-tg",
            name: "Fintopio Telegram",
            imageUrl: "https://fintopio.com/favicons/favicon-196x196.png",
            aboutUrl: "https://fintopio.com",
            universalLink: "https://t.me/fintopio?attach=wallet",
            bridgeUrl: "https://wallet-bridge.fintopio.com/bridge",
            platforms: ["ios", "android", "macos", "windows", "linux"]
          }
        ]
      }}
    >
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dil />} />
            <Route path="/txform" element={<TxForm selectedLanguage={useLanguage().selectedLanguage} />} />
            <Route
              path="/main"
              element={
                <ProtectedRoute>
                  <MainPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </LanguageProvider>
    </TonConnectUIProvider>
  );
}

export default App;
