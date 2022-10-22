import React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <div
      data-testid="loadingScreen"
      className="relative flex items-center justify-center h-screen text-center "
    >
      <iframe src="https://embed.lottiefiles.com/animation/85759"></iframe>
      <div className="absolute inset-0 z-10"></div>
      {/* <i className="text-6xl bx bx-loader-alt bx-spin "></i> */}
    </div>
  );
};

export default LoadingScreen;
