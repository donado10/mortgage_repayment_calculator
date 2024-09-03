import { ReactNode } from "react";

export const InputFormLayout: React.FC<{
  children: ReactNode;
  isFocus?: boolean;
  isError?: boolean;
}> = ({ children, isFocus, isError }) => {
  let classValue = `flex h-10 w-full overflow-hidden rounded-l-lg rounded-r-lg hover:cursor-pointer hover:border-2 border-[1px] border-slate-500`;

  if (isFocus) {
    classValue = `flex h-10 w-full overflow-hidden rounded-l-lg rounded-r-lg hover:cursor-pointer hover:border-2 border-[1px] border-lime-custom `;
  }

  if (!isFocus && isError) {
    classValue = `flex h-10 w-full overflow-hidden rounded-l-lg rounded-r-lg hover:cursor-pointer hover:border-2 border-[1px] border-red-custom `;
  }

  return <div className={classValue}>{children}</div>;
};

export const InputFormCheckboxLayout: React.FC<{
  children: ReactNode;
  isFocus?: boolean;
}> = ({ children, isFocus }) => {
  return (
    <div
      className={`flex h-10 w-full items-center gap-5 overflow-hidden rounded-l-lg rounded-r-lg border-[1px] hover:cursor-pointer hover:border-lime-custom ${isFocus ? "border-lime-custom bg-[#D8DB2F]/15" : "border-slate-500"} p-2`}
    >
      {children}
    </div>
  );
};

export const InputFormPrefix: React.FC<{
  content: string;
  isFocus?: boolean;
  isError?: boolean;
}> = ({ content, isFocus, isError }) => {
  let classValue = `flex min-w-[5%] items-center justify-center py-1 bg-slate-100`;

  if (isFocus) {
    classValue = `flex min-w-[5%] items-center justify-center py-1 bg-lime-custom`;
  }

  if (!isFocus && isError) {
    classValue = `flex min-w-[5%] items-center justify-center py-1 bg-red-custom`;
  }

  return (
    <div className={classValue}>
      <span
        className={`px-4 font-bold ${isError ? "text-white" : "text-slate-700"} `}
      >
        {content}
      </span>
    </div>
  );
};

export const InputLabel: React.FC<{ label: string }> = ({ label }) => {
  return (
    <label className="font-medium text-slate-700" htmlFor={label}>
      {label}
    </label>
  );
};

export const InputCheckboxLabel: React.FC<{ label: string }> = ({ label }) => {
  return (
    <label className="font-semibold text-slate-900" htmlFor={label}>
      {label}
    </label>
  );
};
