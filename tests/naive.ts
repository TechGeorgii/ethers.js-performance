import { ethers } from "ethers";
import { abi } from "../abi";

export async function naive(rpcUrl: string, wallets: string[]) {
  const provider = new ethers.JsonRpcProvider(rpcUrl);

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
