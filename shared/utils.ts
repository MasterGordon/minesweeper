export const pickRandom = <T>(arr: T[]) => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

export const hashStr = (str: string) => {
  return [...str].reduce(
    (hash, c) => (Math.imul(31, hash) + c.charCodeAt(0)) | 0,
    0,
  );
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
