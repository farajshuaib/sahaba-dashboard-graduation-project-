import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.svg";

export interface LogoProps {
  img?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ img = logoImg, className = "" }) => {
  return (
    <Link
      to="/"
      className={`ttnc-logo inline-block text-primary-6000 ${className}`}
    >
      {/* THIS USE FOR MY CLIENT */}
      {/* PLEASE UN COMMENT BELLOW CODE AND USE IT */}
      {img ? (
        <img
          className={`block max-h-16`}
          src={img}
          alt="Logo"
        />
      ) : (
        "Logo Here"
      )}
    </Link>
  );
};

export default Logo;
