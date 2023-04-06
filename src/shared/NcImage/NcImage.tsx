import React, {
  FC,
  ImgHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import PlaceIcon from "./PlaceIcon";
import axios from "axios";

const RenderPoem: FC<{ src: string }> = ({ src }) => {
  const [content, setContent] = useState<string[]>([]);
  useEffect(() => {
    axios.get(src).then((res) => {
      const { data } = res;
      setContent(data.split("\n"));
    });
  }, []);

  return (
    <div className="h-fit">
      <div
        className={`grid grid-cols-2 items-center gap-3 text-lg leading-relaxed tracking-wide poem-box rounded-3xl max-h-96  group-hover:scale-[1.01] transition-transform duration-300 ease-in-out will-change-transform`}
      >
        {content && content.length > 0 ? (
          content.map((item, index) => (
            <p
              key={index}
              className="leading-relaxed  text-center"
            >
              {item}
            </p>
          ))
        ) : (
          <PlaceIcon />
        )}
      </div>
    </div>
  );
};

export interface NcImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  contentType?: string;
}

const NcImage: FC<NcImageProps> = ({
  containerClassName = "",
  alt = "nc-imgs",
  src = "",
  className = "object-cover w-full h-full",
  contentType,
  ...args
}) => {
  const renderLoadingPlaceholder = () => {
    return (
      <div
        className={`${className} flex items-center justify-center bg-neutral-200 dark:bg-neutral-6000 text-neutral-100 dark:text-neutral-500`}
      >
        <div className="h-2/4 max-w-[50%]">
          <PlaceIcon />
        </div>
      </div>
    );
  };

  if (!contentType || contentType.includes("image")) {
    return (
      <div className={` ${containerClassName}`} data-nc-id="NcImage">
        {src ? (
          <img src={src} className={className} loading="lazy" alt={alt} {...args} />
        ) : (
          renderLoadingPlaceholder()
        )}
      </div>
    );
  }

  if (contentType.includes("text")) {
    return (
      <div data-nc-id="NcImage">
        <RenderPoem src={src} />
      </div>
    );
  }

  return <div data-nc-id="NcImage">{renderLoadingPlaceholder()}</div>;
};

export default NcImage;
