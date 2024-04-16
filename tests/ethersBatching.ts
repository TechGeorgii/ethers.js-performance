import { ethers } from "ethers";
import { abi } from "../abi";

export async function ethersBatching(rpcUrl: string, wallets: string[]) {
  const req = new ethers.FetchRequest(rpcUrl);

  req.timeout = 10000;
  req.setThrottleParams({
    maxAttempts: 12,
  });

  const provider = new ethers.JsonRpcProvider(req, undefined, {
    batchMaxCount: 10,
    batchStallTime: 100,
  });

  await Promise.all(
    wallets.map(async (wallet) => {
      const contract = new ethers.Contract(
        "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        abi,
        provider
      );
      const bal = await contract.balanceOf(wallet);

      console.log(`Wallet: ${wallet}, Balance: ${bal}`);
    })
  );
}
