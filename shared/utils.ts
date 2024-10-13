export const pickRandom = <T>(arr: T[]) => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

interface WeightedEntry<T> {
  weight: number;
  value: T;
}

export const hashStr = (str: string) => {
  return [...str].reduce(
    (hash, c) => (Math.imul(31, hash) + c.charCodeAt(0)) | 0,
    0,
  );
};

export const weightedPickRandom = <T>(
  arr: WeightedEntry<T>[],
  getRandom: (tw: number) => number = (totalWeight) =>
    Math.random() * totalWeight,
): T => {
  const totalWeight = arr.reduce((acc, cur) => acc + cur.weight, 0);
  const random = getRandom(totalWeight);
  let currentWeight = 0;
  for (const entry of arr) {
    currentWeight += entry.weight;
    if (random < currentWeight) {
      return entry.value;
    }
  }
  return arr[arr.length - 1].value;
};
