import React from "react";

interface props {
  title: string;
  value: string | undefined;
}

const Labeled: React.FC<props> = ({ title, value }) => {
  return (
    <div className="">
      <label htmlFor={title} className="text-xl  text-gray700">{title}</label>
      <h4 id={title} className="my-2 text-xl">{value || "unknown"}</h4>
    </div>
  );
};

export default Labeled;
