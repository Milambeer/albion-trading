import { ChangeEvent, useCallback } from "react";
import { CheckboxForm } from "./CheckboxForm";
import { useAppDispatch, useAppSelector } from "../store/hook";
import {
  selectBuyCity,
  selectSellCity,
  selectServer,
  toggleBuyCity,
  toggleSellCity,
  updateServer,
} from "../store/filtersSlice";
import { City, Server } from "../type";
import { SelectInputForm } from "./SelectInputForm";

interface FilterProps {
  handleUpdateData: () => void;
  updateDate?: Date;
  progress?: number;
}

export const Filter = ({
  handleUpdateData,
  updateDate,
  progress,
}: FilterProps) => {
  const dispatch = useAppDispatch();
  const buyCity = useAppSelector(selectBuyCity);
  const sellCity = useAppSelector(selectSellCity);
  const server = useAppSelector(selectServer);

  const handleBuyCity = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(toggleBuyCity(event.target.value as City));
    },
    [dispatch],
  );

  const handleSellCity = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(toggleSellCity(event.target.value as City));
    },
    [dispatch],
  );

  const handleSelectServer = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      dispatch(updateServer(event.target.value as Server));
    },
    [dispatch],
  );

  return (
    <div className="relative overflow-x-auto rounded-lg bg-dark-gray">
      <div className="flex py-4">
        <div className="flex flex-col items-center px-8">
          <SelectInputForm
            label="Server"
            options={Server}
            value={server}
            onChange={handleSelectServer}
            className="mb-2"
          />
          <button
            className="rounded-lg bg-bee-yellow p-2 font-bold hover:bg-bee-yellow-hover"
            onClick={handleUpdateData}
          >
            Update Data
          </button>
          {progress && progress < 100 && (
            <label className="text-bright-star">{`${Math.floor(progress)}%`}</label>
          )}

          {!updateDate && <label className="text-bright-star">No Data</label>}
          {updateDate && progress && progress > 99 && (
            <label className="text-bright-star">
              {`Last update: ${updateDate.toDateString()} at ${updateDate.getHours()}:${updateDate.getMinutes()}`}
            </label>
          )}
        </div>

        <div>
          <CheckboxForm
            title={"Buy City"}
            data={buyCity}
            onChange={handleBuyCity}
          />
          <CheckboxForm
            title={"Sell City"}
            data={sellCity}
            onChange={handleSellCity}
          />
        </div>
      </div>
    </div>
  );
};
