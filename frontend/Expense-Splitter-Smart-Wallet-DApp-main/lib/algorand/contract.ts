import algosdk from "algosdk";
import { algodClient, APP_ID } from "./client";
import { peraWallet } from "./wallet";

// export async function optInMember(account: string) {
//   const params = await algodClient.getTransactionParams().do();

//   const txn = algosdk.makeApplicationNoOpTxnFromObject({
//     sender: account,
//     appIndex: APP_ID,
//     appArgs: [new Uint8Array(Buffer.from("opt_in_member"))],
//     suggestedParams: params,
//   });

//   // 🚀 Pera expects base64 encoded unsigned txn
//   const txnsToSign = [
//     {
//       txn: Buffer.from(
//         algosdk.encodeUnsignedTransaction(txn)
//       ).toString("base64"),
//     },
//   ];

//   const signedTxns = await peraWallet.signTransaction(txnsToSign);

//   // send signed transaction
//   const sendResponse = await algodClient
//     .sendRawTransaction(signedTxns)
//     .do();

//   // 🔥 FIXED — correct property name
//   const txId = sendResponse.txid;

//   await algosdk.waitForConfirmation(algodClient, txId, 4);

//   return txId;
// }
export async function optInMember(account: string) {
  const params = await algodClient.getTransactionParams().do();

  // ARC4 method selector
  const method = algosdk.ABIMethod.fromSignature("opt_in_member()void");

  const txn = algosdk.makeApplicationNoOpTxnFromObject({
    sender: account,
    appIndex: APP_ID,
    appArgs: [method.getSelector()],
    suggestedParams: params,
  });

  const signedTxns = await peraWallet.signTransaction([[{ txn }]]);

  const { txid } = await algodClient.sendRawTransaction(signedTxns).do();

  await algosdk.waitForConfirmation(algodClient, txid, 4);

  return txid;
}
