import { config } from "dotenv";
import { getRandomEthereumAddress } from "./getRandomEthereumAddress";
import { measurePerformance } from "./measurePerformance";
import { naive } from "./tests/naive";
import { ethersBatching } from "./tests/ethersBatching";
import { manualBatching } from "./tests/manualBatching";

async function main() {
  config({ path: ".env" });

  const wallets = Array(10)
    .fill(0)
    .map(() => getRandomEthereumAddress());

  const f = () =>
    // naive(process.env.INFURA_URL!, wallets);
    manualBatching(process.env.ALCHEMY_URL!, wallets);
  //ethersBatching(process.env.MYNODE_URL!, wallets);

  measurePerformance(f);
}

main().catch((error) => {
  console.error("Error main:", error);
});
