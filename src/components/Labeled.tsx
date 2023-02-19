import React from "react";
import { useTranslation } from "react-i18next";

interface props {
  title: string;
  value: string | undefined;
  preview?: boolean;
  previewTitle?: string;
}

const Labeled: React.FC<props> = ({ title, value, preview, previewTitle }) => {
  const { t } = useTranslation();
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
          {previewTitle || t('preview')}
        </a>
      ) : (
        <h4 id={title} className="my-2 text-xl truncate">
          {`${value}` || t('unknown')}
        </h4>
      )}
    </div>
  );
};

export default Labeled;
