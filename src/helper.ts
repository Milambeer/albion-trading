import { DISTANCE, FRESHNESS_LIMIT_HOUR } from "./data/constant";
import { Item, ItemTrade } from "./type";

const getId = (item: Item) => `${item.itemId}Q${item.quality}`;

export const toCamelCase = (str: string) => {
  return str.replace(/_(\w)/g, (_match, group) => group.toUpperCase());
};

export const compare =
  <Type>(key: keyof Type) =>
  (a: Type, b: Type) => {
    return typeof a[key] === "number" && typeof b[key] === "number"
      ? a[key] - b[key]
      : 0;
  };

export const aggregateData = (data: Item[], now: Date) => {
  const itemsToAggregate: string[] = [];
  const processedItems: ItemTrade[] = [];
  data.forEach((item) => {
    if (!itemsToAggregate.includes(getId(item))) {
      itemsToAggregate.push(getId(item));
    }
  });

  itemsToAggregate.forEach((itemId) => {
    const minSellOrdersSorted = data
      .filter((item) => getId(item) === itemId)
      .filter((item) => item.sellPriceMin !== 0)
      .filter((item) => {
        const date = new Date(item.sellPriceMinDate + "Z");
        return (
          (now.valueOf() - date.valueOf()) / 1000 / 60 / 60 <
          FRESHNESS_LIMIT_HOUR
        );
      })
      .sort(compare<Item>("sellPriceMin"));
    const maxBuyOrdersSorted = data
      .filter((item) => getId(item) === itemId)
      .filter((item) => item.buyPriceMax !== 0)
      .filter((item) => {
        const date = new Date(item.buyPriceMaxDate + "Z");
        return (
          (now.valueOf() - date.valueOf()) / 1000 / 60 / 60 <
          FRESHNESS_LIMIT_HOUR
        );
      })
      .sort(compare<Item>("buyPriceMax"))
      .reverse();

    if (!maxBuyOrdersSorted.length || !minSellOrdersSorted.length) return;
    const buyPriceDate = new Date(
      minSellOrdersSorted[0].sellPriceMinDate + "Z",
    );
    const sellPriceDate = new Date(maxBuyOrdersSorted[0].buyPriceMaxDate + "Z");

    const processedItem: ItemTrade = {
      itemId,
      profit:
        maxBuyOrdersSorted[0].buyPriceMax - minSellOrdersSorted[0].sellPriceMin,
      distance:
        DISTANCE[minSellOrdersSorted[0].city][maxBuyOrdersSorted[0].city],
      buyCity: minSellOrdersSorted[0].city,
      sellCity: maxBuyOrdersSorted[0].city,
      buyPrice: minSellOrdersSorted[0].sellPriceMin,
      sellPrice: maxBuyOrdersSorted[0].buyPriceMax,
      buyPriceTime: now.valueOf() - buyPriceDate.valueOf(),
      sellPriceTime: now.valueOf() - sellPriceDate.valueOf(),
    };
    if (processedItem.profit > 0) processedItems.push(processedItem);
  });

  return processedItems;
};
