import ButtonPrimary from "shared/Button/ButtonPrimary";
import React from "react";
import NcImage from "shared/NcImage/NcImage";
import I404Png from "../assets/404.png";

const Page404: React.FC = () => {
  return (
    <div className="nc-Page404">
      <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
        {/* HEADER */}
        <header className="max-w-2xl mx-auto space-y-2 text-center">
          <NcImage src={I404Png} />
          <span className="block text-sm font-medium tracking-wider text-neutral-800 sm:text-base dark:text-neutral-200">
            404 page not found
          </span>
          <div className="pt-8">
            <ButtonPrimary href="/">Return Home Page</ButtonPrimary>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Page404;
