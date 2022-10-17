import React from "react";

const ServerError: React.FC = () => {
  return (
    <section className="flex flex-col items-center gap-8 justify-center h-screen text-center relative">
      <iframe className="mx-auto w-full h-64" src="https://embed.lottiefiles.com/animation/92811"></iframe>
      <h1 className="text-4xl text-center">
        <span className="text-6xl">500</span> <br />
        Internal server error
      </h1>
      <p className="mt-3">We are currently trying to fix the problem</p>
      <div className="absolute inset-0 z-10"></div>
    </section>
  );
};

export default ServerError;
