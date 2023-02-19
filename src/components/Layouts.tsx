/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, Fragment, forwardRef } from "react";

import logo from "../assets/logo.svg";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useClickAway } from "react-use";
import { Popover, Transition } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { isLoggedIn, logout } from "../app/account/actions";
import LoadingScreen from "./LoadingScreen";
import { useWeb3React } from "@web3-react/core";
import { switchNetwork } from "../utils/functions";
import { connectors } from "../services/connectors";
import { unwrapResult } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";

interface nav {
  setToggleSideBar: (val: boolean) => void;
}

const Nav: React.FC<nav> = ({ setToggleSideBar }) => {
  const { t, i18n } = useTranslation();
  const web3React = useWeb3React();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loggingOut, setLoggingOut] = useState<boolean>(false);
  const userData: UserData = useAppSelector((state) => state.account.userData);

  const Logout = async () => {
    setLoggingOut(true);
    try {
      web3React.deactivate();
      await dispatch(logout());
      setLoggingOut(false);
      navigate("/login");
      toast.success(t("logged-out-successfully"));
    } catch (error) {
      setLoggingOut(false);
      toast.error(t("something-went-wrong"));
    }
  };

  const handleConnectToWallet = async () => {
    try {
      const result = await switchNetwork();
      if (!result) return;
      web3React.activate(connectors.injected);
      localStorage.setItem("provider", "injected");
      if (!web3React.error) {
        return;
      }
      toast.error(
        web3React.error?.message ||
          t(
            "connecting-to-wallet-has-been-failed-youre-connecting-to-unsupported-network-please-switch-to-ethereum-network"
          )
      );
    } catch (e: any) {
      toast.error(e || t("connecting-to-wallet-has-been-failed"));
    }
  };

  return (
    <nav className="z-40 flex items-center justify-between w-full px-5 py-2 bg-white border-b border-gray-200 md:fixed md:px-8">
      <div className="flex items-center gap-2">
        <i
          onClick={() => setToggleSideBar(true)}
          className="text-3xl cursor-pointer  bx bx-menu md:hidden"
        ></i>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="logo"
            loading="lazy"
            decoding="async"
            className="h-10 md:h-16"
          />
          <h3 className="hidden text-2xl font-bold leading-relaxed tracking-wide uppercase text-primary-800 md:block">
            SAHABA
          </h3>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-primary-100 text-primary-800">
          <i
            onClick={handleConnectToWallet}
            className="text-lg cursor-pointer bx bx-wallet"
          ></i>
          {web3React.active ? (
            <div className="flex items-center gap-2">
              <span>
                {web3React.account?.slice(0, 6) +
                  "..." +
                  web3React.account?.slice(6, 10)}
              </span>
              <button
                onClick={() => web3React.deactivate()}
                className="px-2 py-1 text-xs rounded-lg text-red900 bg-red900/10"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <span className="cursor-pointer" onClick={handleConnectToWallet}>
              {t("connect-to-wallet")}
            </span>
          )}
        </div>
        <Popover className="relative">
          <Popover.Button className="flex items-center">
            <h3 className="p-1 text-sm font-medium md:p-2 md:text-base text-gray800">
              {userData?.username}
            </h3>
            <div className="flex items-center justify-center w-8 h-8 border rounded-full border-gray200">
              <i className="bx bx-user text-gray600 "></i>
            </div>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-2"
          >
            <Popover.Panel className="absolute right-0 mt-5 transform translate-y-2 bg-white border border-gray-100 rounded-md shadow-xl w-44 top-1/2">
              <ul>
                <li
                  onClick={() => {
                    navigate("/my-profile");
                  }}
                  aria-hidden="true"
                  className="flex items-center justify-start w-full px-2 py-3 border-b border-gray-200 cursor-pointer select-none text-gray800 hover:bg-gray-50"
                >
                  <i className="mx-2 bx bx-user"></i>
                  <span>{t("my-account")}</span>
                </li>
                <li
                  onClick={Logout}
                  aria-hidden="true"
                  className="flex items-center justify-between w-full px-2 py-3 cursor-pointer select-none text-gray800 hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <i className="mx-2 bx bx-log-in"></i>
                    <span>{t("logout")}</span>
                  </div>
                  {loggingOut && (
                    <i className="text-2xl bx bx-loader-alt bx-spin "></i>
                  )}
                </li>
              </ul>
            </Popover.Panel>
          </Transition>
        </Popover>
        <button onClick={() => {
          i18n.changeLanguage(i18n.language === "en" ? "ar" : "en")
        }}>
          <i className="bx bx-world text-2xl text-gray-700"></i>
        </button>
      </div>
    </nav>
  );
};

interface SideBarProps {
  toggleSideBar: boolean;
  setToggleSideBar: (val: boolean) => void;
}

const SideBar = forwardRef((props: SideBarProps, drawer: any) => {
  const location = useLocation();
  const [toggleMenu, setToggleMenu] = useState<string>("");
  const { t, i18n } = useTranslation();

  const calcElementHeight = (el: navLink[]) => {
    let numberOfElements = el.length;
    let height = +numberOfElements * 50; // 50 is the height of each li
    return height;
  };

  const routerLinks: navLink[] = [
    {
      name: t("home"),
      path: "/",
      icon: <i className="bx bx-home"></i>,
      isVisible: true,
    },
    {
      name: t("users"),
      path: "/users",
      icon: <i className="bx bx-user"></i>,
      isVisible: true,
    },
    {
      name: t("kyc-applications"),
      path: "/KYC-applications",
      icon: <i className="bx bx-id-card"></i>,
      isVisible: true,
    },
    {
      name: t("categories"),
      path: "/categories",
      icon: <i className="bx bx-category"></i>,
      isVisible: true,
    },
    {
      name: t("collections"),
      path: "/collections",
      icon: <i className="bx bx-collection"></i>,
      isVisible: true,
    },
    {
      name: t("nfts"),
      path: "/nfts",
      icon: <i className="bx bx-image-alt"></i>,
      isVisible: true,
    },
    {
      name: t("transactions"),
      path: "/transactions",
      icon: <i className="bx bx-transfer"></i>,
      isVisible: true,
    },
    {
      name: t("reports"),
      path: "/reports",
      icon: <i className="bx bxs-report"></i>,
      isVisible: true,
    },
    {
      name: t("subscribers"),
      path: "/subscribers",
      icon: <i className="bx bxs-captions"></i>,
      isVisible: true,
    },
  ];

  return (
    <div
      ref={drawer}
      className={`hidden-scrollbar bg-white ${
        i18n.language == "en" ? "border-r" : ""
      }  border-gray-200 fixed top-0 h-screen z-30 md:pt-16 w-72 pb-8 transition-all duration-300 overflow-y-scroll  ${
        props?.toggleSideBar
          ? i18n.language == "en"
            ? "left-0"
            : "right-0"
          : i18n.language == "en"
          ? "-left-72 md:left-0"
          : "-right-72 md:right-0"
      }`}
    >
      <div className="flex items-center justify-between p-5 md:hidden ">
        <img
          loading="lazy"
          decoding="async"
          src={logo}
          alt="logo"
          className="h-12"
        />
        <i
          onClick={() => props.setToggleSideBar(false)}
          className="text-3xl bx bx-menu"
        ></i>
      </div>

      <ul className="p-4 my-5 ">
        {routerLinks
          .filter((link: navLink) => link.isVisible)
          .map((item: navLink, index: number) => (
            <li key={index} className="w-full">
              {!item.elements ? (
                <NavLink
                  to={item.path}
                  end
                  onClick={() => props.setToggleSideBar(false)}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "bg-primary-100 text-primary-800 font-medium"
                        : "text-gray-800"
                    } w-full relative overflow-hidden flex items-center gap-2 hover:bg-primary-100 my-2 px-3 py-2 text-lg rounded-lg`
                  }
                >
                  {location.pathname === item.path && (
                    <span className="absolute left-0 block w-1 h-full rounded-lg bg-primary-700"></span>
                  )}

                  <span
                    className={`${
                      location.pathname === item.path
                        ? "text-primary"
                        : "text-gray600"
                    } `}
                  >
                    {" "}
                    {item.icon}
                  </span>

                  <span className=""> {item.name}</span>
                </NavLink>
              ) : (
                <div>
                  {/* toggle menu button */}
                  <button
                    onClick={() => {
                      setToggleMenu(toggleMenu === item.path ? "" : item.path);
                    }}
                    className={`${
                      location.pathname.includes(item.path)
                        ? "border-r-4 border-primary text-primary font-medium"
                        : "text-gray800"
                    } w-full  px-4 py-3 text-lg flex items-center justify-between`}
                  >
                    <div className="flex items-center">
                      <span
                        className={`${
                          location.pathname.includes(item.path)
                            ? "text-primary"
                            : "text-gray600"
                        } `}
                      >
                        {item.icon}
                      </span>
                      <span className="mx-2"> {item.name}</span>
                    </div>
                    <i
                      className={`${
                        toggleMenu === item.path ? "rotate-180" : ""
                      } bx bx-chevron-down transform transition-all duration-300 text-gray700 text-xl`}
                    ></i>
                  </button>
                  {/* submenu links ... */}
                  <ul
                    style={{
                      height:
                        toggleMenu === item.path
                          ? calcElementHeight(
                              item.elements.filter(
                                (link: navLink) => link.isVisible
                              )
                            )
                          : 0,
                    }}
                    className={` border-r-2 border-gray800  mr-5  transition-all duration-30 overflow-hidden`}
                  >
                    {item.elements
                      .filter((link: navLink) => link.isVisible)
                      .map((sublink, index) => (
                        <li key={index} className="h-12">
                          <NavLink
                            to={sublink.path}
                            onClick={() => props.setToggleSideBar(false)}
                            className={({ isActive }) =>
                              `${
                                isActive
                                  ? "text-primary font-medium"
                                  : "text-gray800"
                              } w-full flex items-center p-3 text-lg`
                            }
                          >
                            <div className="flex items-center">
                              <span
                                className={`${
                                  location.pathname === sublink.path
                                    ? "text-primary"
                                    : "text-gray600"
                                } `}
                              >
                                {sublink.icon}
                              </span>
                              <span className="mx-2"> {sublink.name}</span>
                            </div>
                          </NavLink>
                        </li>
                      ))}
                  </ul>
                  {/*  */}
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
});

const Layout: React.FC = () => {
  const [toggleSideBar, setToggleSideBar] = useState<boolean>(false);
  const drawer = useRef(null);
  const { t, i18n } = useTranslation();

  useClickAway(drawer, () => {
    if (toggleSideBar) {
      setToggleSideBar(false);
    }
  });

  return (
    <div className="relative overflow-hidden bg-gray100 ">
      <Nav setToggleSideBar={(val: boolean) => setToggleSideBar(val)} />
      <div className="relative flex w-full h-full">
        <SideBar
          ref={drawer}
          toggleSideBar={toggleSideBar}
          setToggleSideBar={(val: boolean) => setToggleSideBar(val)}
        />

        <main
          className={`relative w-full h-full mx-auto ${
            i18n.language == "en" ? "md:pl-72 " : "md:pr-72 "
          } md:pt-16`}
        >
          <div className="w-full min-h-screen p-5 mb-16 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
