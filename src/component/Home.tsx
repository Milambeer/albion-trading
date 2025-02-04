import { useCallback, useState } from "react";
import { QS_MAX_CHAR } from "../data/constant";
import { DATABASE } from "../data/database";
import { aggregateData, compare, toCamelCase } from "../helper";
import { Item, ItemAPI, ItemTrade } from "../type";
import { Filter } from "./Filter";
import { TableView } from "./TableView";
import { getItems } from "../api/dataProvider";
import { Header } from "./Header";
import { selectServer } from "../store/filtersSlice";
import { useAppSelector } from "../store/hook";

function Home() {
  const [processedData, setProcessedData] = useState<ItemTrade[]>([]);
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const [pullDataDate, setPullDataDate] = useState<Date | undefined>(undefined);
  const server = useAppSelector(selectServer);

  const handleRetrieveData = useCallback(async () => {
    setProcessedData([]);

    const parsedDatabase: string[] = [];
    let tmpChain = "";
    DATABASE.forEach((item) => {
      tmpChain = tmpChain + item + ",";
      if (tmpChain.length > QS_MAX_CHAR) {
        tmpChain = tmpChain.slice(0, tmpChain.length - 1);
        parsedDatabase.push(tmpChain);
        tmpChain = "";
      }
    });
    const now = new Date();
    setPullDataDate(now);

    const processedDataLocal: ItemTrade[][] = [];
    let count = 1;

    for (const collectionIds of parsedDatabase) {
      setProgress((count * 100) / parsedDatabase.length);
      const resultData = await getItems({ collectionIds, server });

      const cleanedDataFragment = resultData.data.map((item: ItemAPI) =>
        Object.keys(item).reduce((newItem, currValue) => {
          return {
            ...newItem,
            [toCamelCase(currValue)]: item[currValue as keyof ItemAPI],
          };
        }, {}),
      ) as Item[];

      const processedDataFragment = aggregateData(cleanedDataFragment, now);
      processedDataLocal.push(processedDataFragment);
      count += 1;
    }

    setProcessedData(
      processedDataLocal.flat().sort(compare<ItemTrade>("profit")).reverse(),
    );
  }, [server]);

  return (
    <div className="min-h-screen bg-dynamic-black">
      <div className="container mx-auto">
        <Header />
        <Filter
          handleUpdateData={handleRetrieveData}
          updateDate={pullDataDate}
          progress={progress}
        />
        <TableView data={processedData} />
      </div>
    </div>
  );
}

export default Home;
