import React from "react";

interface props {
  title: string;
  value: string | undefined;
  preview?: boolean;
  previewTitle?: string;
}

const Labeled: React.FC<props> = ({ title, value, preview, previewTitle }) => {
  return (
    <div className="">
      <label htmlFor={title} className="text-xl text-gray700">
        {title}
      </label>
      {preview ? (
        <a
          id={title}
          target="_blank"
          href={value}
          className="block my-2 text-xl text-blue-500"
        >
          {previewTitle || "Preview"}
        </a>
      ) : (
        <h4 id={title} className="my-2 text-xl truncate">
          {`${value}` || "unknown"}
        </h4>
      )}
    </div>
  );
};

export default Labeled;
