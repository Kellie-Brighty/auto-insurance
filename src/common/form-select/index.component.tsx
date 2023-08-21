import React from "react";

interface FormSelectComponentProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  Icon?: React.ReactNode;
}

const FormSelectComponent: React.FC<FormSelectComponentProps> = ({
  label,
  Icon,
  children,
  ...selectProps
}) => {
  return (
    <div className={"space-y-2"}>
      {label && <span className={"font-medium"}>{label}</span>}

      <div
        className={
          "p-3 flex items-center gap-2 bg-gray-light border border-gray-main rounded-md"
        }
      >
        {Icon}
        <select
          {...selectProps}
          className={
            "flex-1 text-gray-dark font-medium bg-transparent focus:outline-none uppercase"
          }
        >
          {children}
        </select>
      </div>
    </div>
  );
};

export default FormSelectComponent;
