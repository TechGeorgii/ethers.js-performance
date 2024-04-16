import { JsonRpcPayload, ethers } from "ethers";
import { abi } from "../abi";

const createPayload = async (
  token: string,
  wallet: string,
  provider: ethers.JsonRpcProvider
) => {
  const contract = new ethers.Contract(token, abi, provider);
  const byContract = await contract.balanceOf.populateTransaction(wallet);

  return {
    method: "eth_call",
    id: 1,
    params: [byContract, "latest"],
    jsonrpc: "2.0",
  } as JsonRpcPayload;
};

export async function manualBatching(rpcUrl: string, wallets: string[]) {
  const provider = new ethers.JsonRpcProvider(rpcUrl);

  const payloads = await Promise.all(
    wallets.map(async (wallet) => {
      return {
        payload: createPayload(
          "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
          wallet,
          provider
        ),
        wallet: wallet,
      };
    })
  );

  const pl = await Promise.all(payloads.map((p) => p.payload));
  const res = await provider._send(pl);

  for (let i = 0; i < res.length; i++) {
    console.log(` Wallet: ${payloads[i].wallet}, Balance: ${res[i].result}`);
  }
}
