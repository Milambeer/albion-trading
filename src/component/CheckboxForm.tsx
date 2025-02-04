import { ChangeEventHandler } from "react";

interface CheckboxFormProps {
  title: string;
  data: Record<string, boolean>;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const CheckboxForm = ({ title, data, onChange }: CheckboxFormProps) => {
  return (
    <>
      <h3 className="font-semibold text-bright-star">{title}</h3>
      <ul className="w-full items-center text-sm font-medium text-bright-star sm:flex">
        {data &&
          Object.keys(data).map((key) => (
            <li key={`key-${key}`} className="w-full">
              <div className="flex items-center ps-3">
                <label className="ms-2 flex w-full cursor-pointer items-center whitespace-nowrap py-3 text-sm font-medium text-bright-star">
                  <input
                    id={`id-${key}`}
                    checked={data[key]}
                    type="checkbox"
                    value={key}
                    className="h-4 w-4 cursor-pointer checked:border-bee-yellow checked:bg-bee-yellow"
                    onChange={onChange}
                  />
                  <span className="ml-1">{key}</span>
                </label>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};
