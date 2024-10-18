export const pickRandom = <T>(arr: T[]) => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

function bashHashStr(str: string) {
  let hash = 5381,
    i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  return hash >>> 0;
}

export const hashStr = (str: string) => {
  return Number(`0.${bashHashStr(str)}`);
};

export const weightedPickRandom = <T>(
  arr: T[],
  getWeight: (item: T) => number = () => 1,
  getRandom: (tw: number) => number = (totalWeight) =>
    Math.random() * totalWeight,
): T => {
  const totalWeight = arr.reduce((acc, cur) => acc + getWeight(cur), 0);
  const random = getRandom(totalWeight);
  let currentWeight = 0;
  for (const entry of arr) {
    currentWeight += getWeight(entry);
    if (random < currentWeight) {
      return entry;
    }
  }
  return arr[arr.length - 1];
};
