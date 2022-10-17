import React, { FC } from "react";

export interface SocialsListProps {
  className?: string;
  itemClass?: string;
  facebook_url?: string;
  twitter_url?: string;
  telegram_url?: string;
  website_url?: string;
}

const SocialsList: FC<SocialsListProps> = ({
  className = "",
  itemClass = "block w-6 h-6",
  facebook_url,
  twitter_url,
  telegram_url,
  website_url,
}) => {
  const socials = [
    {
      name: "Facebook",
      icon: <i className="bx bx-facebook" />,
      href: facebook_url,
    },
    {
      name: "Twitter",
      icon: <i className="bx bx-twitter" />,
      href: twitter_url,
    },
    {
      name: "Telegram",
      icon: <i className="bx bx-telegram" />,
      href: telegram_url,
    },
    {
      name: "website",
      icon: <i className="bx bx-website" />,
      href: website_url,
    },
  ];
  return (
    <nav
      className={`nc-SocialsList flex space-x-2.5 text-2xl text-neutral-6000 dark:text-neutral-300 gap-3 ${className}`}
      data-nc-id="SocialsList"
    >
      {socials
        .filter((item) => !!item.href)
        .map((item, i) => (
          <a
            key={i}
            className={`${itemClass}`}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            title={item.name}
          >
            {item.icon}
          </a>
        ))}
    </nav>
  );
};

export default SocialsList;
