import { AxiosResponse } from "axios";
import client from "./client";
import { City, ItemAPI, Server } from "../type";

interface GetItemsApi {
  collectionIds: string;
  server: Server;
}

export const getItems = async ({
  collectionIds,
  server,
}: GetItemsApi): Promise<AxiosResponse<ItemAPI[]>> => {
  return client.get(
    `https://${server}.albion-online-data.com/api/v2/stats/prices/${collectionIds}?locations=${Object.values(City).join(",")}`,
  );
};
