import { ChangeEventHandler } from "react";

interface SelectInputFormProps {
  options: Record<string, string>;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value: string;
  className?: string;
  label?: string;
}

export const SelectInputForm = ({
  label,
  options,
  value,
  onChange,
  className,
}: SelectInputFormProps) => {
  return (
    <div className={`mx-auto max-w-sm ${className}`}>
      {label && (
        <label className="mb-8 font-semibold text-white">{label}</label>
      )}
      <select
        onChange={onChange}
        className="block w-full cursor-pointer bg-inherit text-sm text-white outline-none"
        defaultValue={value}
      >
        {options &&
          Object.keys(options).map((optionKey) => (
            <option className="bg-dark-gray" value={options[optionKey]}>
              {optionKey}
            </option>
          ))}
      </select>
    </div>
  );
};
