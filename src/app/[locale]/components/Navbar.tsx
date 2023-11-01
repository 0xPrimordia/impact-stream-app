"use client";
import React, { useState, useEffect } from "react";
import { XMarkIcon, Bars3Icon, ArchiveBoxIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useTranslations } from "next-intl";
import NavbarLink from "./NavbarLink";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const Navbar = () => {
  const [overlay, setOverlay] = useState(false);
  const t = useTranslations("Navigation");
  const router = useRouter();
  const [cartCount, setCartCount] = useState<number>();

  useEffect(() => {
    console.log('cart items: ' + localStorage.getItem("cartItems"))
    const cartItems = localStorage.getItem("cartItems")
    if(cartItems && JSON.parse(cartItems).length > 0)
    setCartCount(JSON.parse(cartItems).length)
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bg-white p-8 pb-4 z-50">
      <div className="z-50 relative inline-block">
        <Link href="/">
          <Image
            src="/impact-stream-logo.svg"
            alt="Impact Stream"
            width={114}
            height={45}
            priority
          />
        </Link>
      </div>
      {overlay && (
        <nav className="brand-bg-color text-3xl font-bold fixed top-0 bottom-0 right-0 left-0 p-10 pt-28 z-40">
          <ul>
            <li className="mb-6">
              <NavbarLink setOverlay={setOverlay} path={"/grants"}>
                {t("link1")}
              </NavbarLink>
            </li>
            <li className="mb-6">
              <NavbarLink setOverlay={setOverlay} path={"/proposals"}>
                {t("link2")}
              </NavbarLink>
            </li>
            <li className="mb-6">
              <NavbarLink setOverlay={setOverlay} path={"/donate"}>
                {t("link3")}
              </NavbarLink>
            </li>
            <li className="mb-6">
              <NavbarLink setOverlay={setOverlay} path={"/cart"}>
                {t("link4")}
              </NavbarLink>
            </li>
            <li className="mb-6">
              <NavbarLink setOverlay={setOverlay} path={"/settings"}>
                {t("link5")}
              </NavbarLink>
            </li>
            <li>
              <NavbarLink setOverlay={setOverlay} target="_blank" path={"https://www.impact.stream/"}>
                {t("link6")}
              </NavbarLink>
            </li>
          </ul>
          <XMarkIcon
            onClick={() => setOverlay(false)}
            className="h-8 absolute right-6 top-10"
          />
        </nav>
      )}
      <div
        onClick={() => {
          router.push(`/cart`);
        }}
      >
        {cartCount && (
          <div className="text-xs bg-blue-600 font-bold rounded-full absolute right-16 z-10 block h-5 leading-5 w-5 text-center text-white top-9">{cartCount}</div>
        )}
        
        <ArchiveBoxIcon className="h-6 absolute right-20 top-11" />
      </div>
      {!overlay && (
        <div onClick={() => setOverlay(true)}>
          <Bars3Icon className="h-8 absolute right-6 top-10" />
        </div>
      )}
    </div>
  );
};
