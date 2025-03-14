import { ItemTrade } from "../../type";
import { useAppSelector } from "../../store/hook";
import { selectBuyCity, selectSellCity } from "../../store/filtersSlice";
import { getRarity, getTier, readableId } from "../../helper";

interface TableViewProps {
  data: ItemTrade[];
}

const TAB_COLUMN = [
  "Item",
  "Profit",
  "Tier",
  "Quality",
  "Rarity",
  "Distance",
  "Buy city",
  "Sell city",
  "Buy price",
  "Sell price",
];

export const TableView = ({ data }: TableViewProps) => {
  const buyCity = useAppSelector(selectBuyCity);
  const sellCity = useAppSelector(selectSellCity);

  return (
    <div className="relative mt-8 overflow-x-auto rounded-lg">
      <table className="w-full table-auto text-center">
        <thead className="bg-pitch text-bright-star">
          <tr>
            {TAB_COLUMN.map((tabColumn) => (
              <th scope="col" className="whitespace-nowrap px-6 py-3">
                {tabColumn}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-dark-gray text-bright-star">
          {data
            .filter((item) => buyCity[item.buyCity] && sellCity[item.sellCity])
            .map((row) => (
              <tr key={row.itemId}>
                <td className="px-6 py-4">{readableId(row.itemId)}</td>
                <td className="px-6 py-4">{row.profit}</td>
                <td className="px-6 py-4">{getTier(row.itemId)}</td>
                <td className="px-6 py-4">
                  {row.itemId.slice(row.itemId.length - 2, row.itemId.length)}
                </td>
                <td className="px-6 py-4">{getRarity(row.itemId)}</td>
                <td className="px-6 py-4">{row.distance}</td>
                <td className="px-6 py-4">{row.buyCity}</td>
                <td className="px-6 py-4">{row.sellCity}</td>
                <td className="no whitespace-nowrap px-6 py-4">{`${row.buyPrice} (${Math.floor(
                  row.buyPriceTime / 1000 / 60 / 60,
                )}h${Math.floor((row.buyPriceTime / 1000 / 60) % 60)} ago)`}</td>
                <td className="whitespace-nowrap px-6 py-4">{`${row.sellPrice} (${Math.floor(
                  row.sellPriceTime / 1000 / 60 / 60,
                )}h${Math.floor((row.sellPriceTime / 1000 / 60) % 60)} ago)`}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
