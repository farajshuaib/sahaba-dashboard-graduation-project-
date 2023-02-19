import React from "react";
import { useTranslation } from "react-i18next";

const EmptyData = () => {
  const { t } = useTranslation();
  return (
    <div className="relative flex items-center justify-center flex-col gap-8 text-center h-screen">
      <iframe
        className="mx-auto"
        src="https://embed.lottiefiles.com/animation/10000"
      ></iframe>
      <h1 className=" text-gray-600 text-2xl">
        {t('sorry-we-didnt-find-any-result')}
      </h1>
      <div className="absolute inset-0 z-10"></div>
    </div>
  );
};

export default EmptyData;
