import algosdk from "algosdk";

const ALGOD_SERVER = "https://testnet-api.algonode.cloud";
const INDEXER_SERVER = "https://testnet-idx.algonode.cloud";

const TOKEN = "";

export const algodClient = new algosdk.Algodv2(
  TOKEN,
  ALGOD_SERVER,
  ""
);

export const indexerClient = new algosdk.Indexer(
  TOKEN,
  INDEXER_SERVER,
  ""
);

// your deployed app id
export const APP_ID = 755799588;
