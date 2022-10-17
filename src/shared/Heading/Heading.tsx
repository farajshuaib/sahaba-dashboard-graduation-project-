import React, { HTMLAttributes, ReactNode } from "react";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  fontClass?: string;
  desc?: ReactNode;
  isCenter?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  children,
  desc = "Discover the most outstanding NFTs in all topics of life. ",
  className = "mb-10 md:mb-12 text-neutral-900 dark:text-neutral-50",
  isCenter = false,
  ...args
}) => {
  return (
    <div
      className={`nc-Section-Heading relative flex flex-col sm:flex-row sm:items-end justify-between ${className}`}
    >
      <div
        className={
          isCenter ? "text-center w-full max-w-2xl mx-auto mb-4" : "max-w-2xl"
        }
      >
        <h2 className={`text-3xl md:text-4xl font-semibold`} {...args}>
          {children || `Section Heading`}
        </h2>
        {desc && (
          <span className="block mt-2 text-base font-normal md:mt-4 sm:text-lg text-neutral-500 dark:text-neutral-400">
            {desc}
          </span>
        )}
      </div>
    </div>
  );
};

export default Heading;
