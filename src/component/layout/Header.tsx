import logo from "../../assets/logo.png";
import gold from "../../assets/gold.png";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { getGoldPrice } from "../../api/dataProvider";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { selectServer, updateServer } from "../../store/filtersSlice";
import { CircleStackIcon } from "@heroicons/react/24/outline";
import { SelectInput } from "../element/SelectInput";
import { Server } from "../../type";

export const Header = () => {
  const [goldPrice, setGoldPrice] = useState(0);
  const server = useAppSelector(selectServer);
  const dispatch = useAppDispatch();

  const fetchGoldPrice = useCallback(async () => {
    const goldPrice = await getGoldPrice({ server });
    setGoldPrice(goldPrice.data[0].price);
  }, [server]);

  const handleSelectServer = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      dispatch(updateServer(event.target.value as Server));
    },
    [dispatch],
  );

  useEffect(() => {
    fetchGoldPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [server]);

  return (
    <div className="flex justify-between">
      <div className="flex py-4">
        <div className="flex flex-col">
          <img src={logo} className="w-8" />
        </div>
        <h1 className="text-2xl text-white">Albion Trading</h1>
      </div>
      <div className="flex py-4">
        <div className="flex flex-col justify-center">
          <CircleStackIcon className="size-6 text-white" />
        </div>
        <div className="flex flex-col justify-center">
          <SelectInput
            options={Server}
            value={server}
            onChange={handleSelectServer}
          />
        </div>
        <div className="ml-2 flex flex-col justify-center">
          <img src={gold} className="h-6 w-6 rounded-full"></img>
        </div>
        <div className="ml-1 flex flex-col justify-center">
          <label className="text-large text-center text-white">
            {goldPrice}
          </label>
        </div>
      </div>
    </div>
  );
};
