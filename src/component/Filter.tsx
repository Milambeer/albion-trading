import { ChangeEvent, useCallback } from "react";
import { CheckboxForm } from "./CheckboxForm";
import { useAppDispatch, useAppSelector } from "../store/hook";
import {
  selectBuyCity,
  selectSellCity,
  toggleBuyCity,
  toggleSellCity,
} from "../store/filtersSlice";
import { City } from "../type";

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

  return (
    <div className="relative overflow-x-auto rounded-lg bg-dark-gray">
      <div className="flex py-4">
        <div className="flex flex-col items-center px-16 py-4">
          <button
            className="rounded-sm bg-bee-yellow p-2 font-bold hover:bg-bee-yellow-hover"
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
            handler={handleBuyCity}
          />
          <CheckboxForm
            title={"Sell City"}
            data={sellCity}
            handler={handleSellCity}
          />
        </div>
      </div>
    </div>
  );
};
