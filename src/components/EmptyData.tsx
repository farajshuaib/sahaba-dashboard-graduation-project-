import React from "react";

const EmptyData = () => {
  return (
    <div className="relative flex items-center justify-center flex-col gap-8 text-center h-screen">
      <iframe
        className="mx-auto"
        src="https://embed.lottiefiles.com/animation/10000"
      ></iframe>
      <h1 className=" text-gray-600 text-2xl">
        Sorry we didn't find any result
      </h1>
      <div className="absolute inset-0 z-10"></div>
    </div>
  );
};

export default EmptyData;
