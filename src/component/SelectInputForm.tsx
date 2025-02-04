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
        <label className="mb-8 font-semibold text-bright-star">{label}</label>
      )}
      <select
        onChange={onChange}
        className="block w-full rounded-lg border border-bright-star bg-dark-gray p-2 text-sm text-bright-star"
        defaultValue={value}
      >
        {options &&
          Object.keys(options).map((optionKey) => (
            <option value={options[optionKey]}>{optionKey}</option>
          ))}
      </select>
    </div>
  );
};
