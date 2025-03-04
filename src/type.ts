export interface ItemAPI {
  item_id: string;
  city: City;
  quality: number;
  sell_price_min: number;
  sell_price_min_date: string;
  sell_price_max: number;
  sell_price_max_date: string;
  buy_price_min: number;
  buy_price_min_date: string;
  buy_price_max: number;
  buy_price_max_date: string;
}

export interface GoldAPI {
  price: number;
  timestamp: string;
}

export interface Item {
  itemId: string;
  city: City;
  quality: number;
  sellPriceMin: number;
  sellPriceMinDate: string;
  sellPriceMax: number;
  sellPriceMaxDate: string;
  buyPriceMin: number;
  buyPriceMinDate: string;
  buyPriceMax: number;
  buyPriceMaxDate: string;
}

export interface ItemTrade {
  itemId: string;
  profit: number;
  distance: number;
  buyCity: City;
  sellCity: City;
  buyPrice: number;
  sellPrice: number;
  buyPriceTime: number;
  sellPriceTime: number;
}

export enum City {
  FortSterling = "Fort Sterling",
  Martlock = "Martlock",
  Bridgewatch = "Bridgewatch",
  Lymhurst = "Lymhurst",
  Thetford = "Thetford",
  Caerleon = "Caerleon",
  BlackMarket = "Black Market",
}

export enum Server {
  EUROPE = "europe",
  AMERICA = "west",
  ASIA = "east",
}

export enum Rarity {
  NORMAL,
  UNCOMMON,
  RARE,
  EXCPETIONAL,
  PRISTINE,
}
