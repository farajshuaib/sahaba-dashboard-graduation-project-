import { avatarColors } from "../../constant";
import React, { FC } from "react";

export interface AvatarProps {
  containerClassName?: string;
  sizeClass?: string;
  radius?: string;
  imgUrl?: string;
  userName?: string;
  hasChecked?: boolean;
  hasCheckedClass?: string;
}

const Avatar: FC<AvatarProps> = ({
  containerClassName = "ring-1 ring-white dark:ring-neutral-900",
  sizeClass = "h-6 w-6 text-sm",
  radius = "rounded-full",
  imgUrl,
  userName,
}) => {
  const url = imgUrl;
  const name = userName || "John Doe";
  const _setBgColor = (name: string) => {
    const backgroundIndex = Math.floor(
      name.charCodeAt(0) % avatarColors.length
    );
    return avatarColors[backgroundIndex];
  };

  return (
    <div
      className={`wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner ${radius} ${sizeClass} ${containerClassName}`}
      style={{ background: url ? undefined : _setBgColor(name) }}
    >
      {url ? (
        <img
          className={`absolute inset-0 object-cover w-full h-full text-center mx-auto  ${radius}`}
          src={url}
          alt={userName}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center ">
          <i className="text-xl text-center bx bx-user"></i>
        </div>
      )}
    </div>
  );
};

export default Avatar;
