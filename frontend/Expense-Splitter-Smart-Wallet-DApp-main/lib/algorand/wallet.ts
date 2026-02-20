import { PeraWalletConnect } from "@perawallet/connect";


export const peraWallet = new PeraWalletConnect();

export async function connectWallet() {
  const accounts = await peraWallet.connect();
  return accounts[0];
}

export function disconnectWallet() {
  peraWallet.disconnect();
}
