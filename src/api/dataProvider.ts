import { AxiosResponse } from "axios";
import client from "./client";
import { City, ItemAPI } from "../type";

const BASE_URL = "https://west.albion-online-data.com/api/v2";

interface GetItemsApi {
  collectionIds: string;
}

export const getItems = async ({
  collectionIds,
}: GetItemsApi): Promise<AxiosResponse<ItemAPI[]>> => {
  return client.get(
    `${BASE_URL}/stats/prices/${collectionIds}?locations=${Object.values(City).join(",")}`,
  );
};
