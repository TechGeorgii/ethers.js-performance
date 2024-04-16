// from https://gist.github.com/paulrberg/b979bd1041df93ccd26d2906bf9dba2b
export function getRandomEthereumAddress(): string {
  const length: number = 40;
  const number: string = [...Array(length)]
    .map(() => {
      return Math.floor(Math.random() * 16).toString(16);
    })
    .join("");
  return "0x" + number;
}
