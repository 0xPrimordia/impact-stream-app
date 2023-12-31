"use client";

import { useCart } from "@/app/context/CartContext";
import {
  Bars3Icon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { usePrivy } from "@privy-io/react-auth";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { strategyContract } from "../utils/contracts";
import NavbarLink from "./NavbarLink";

export const Navbar = () => {
  const { user } = usePrivy();
  const [overlay, setOverlay] = useState(false);
  const [isValidAllocator, setIsValidAllocator] = useState(false);
  const t = useTranslations("Navigation");
  const router = useRouter();
  const context = useCart();

  useEffect(() => {
    const getAllocator = async () => {
      const isValid: any = await strategyContract.read.isValidAllocator([
        user?.wallet?.address!,
      ]);

      console.log("isValid2", isValid);

      if (isValid as boolean === true) {
        setIsValidAllocator(true);
      }
    };

    getAllocator();
  }), [user?.wallet?.address];

  return (
    <div className="fixed top-0 left-0 right-0 bg-white p-8 pb-4 z-50">
      <div className="z-50 relative inline-block">
        <Link href="/proposals">
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
              <NavbarLink setOverlay={setOverlay} path={"/proposals/me"}>
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
              <NavbarLink
                setOverlay={setOverlay}
                target="_blank"
                path={"https://www.impact.stream/"}
              >
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
      {isValidAllocator && (
        <div
          onClick={() => {
            router.push(`/cart`);
          }}
        >
          {context.cartItems.length > 0 && (
            <div className="text-xs bg-blue-600 font-bold rounded-full absolute right-16 z-10 block h-5 leading-5 w-5 text-center text-white top-9">
              {context.cartItems.length}
            </div>
          )}

          <span className="h-8 absolute right-20 top-11">📥</span>
        </div>
      )}

      {!overlay && (
        <div onClick={() => setOverlay(true)}>
          <Bars3Icon className="h-8 absolute right-6 top-10" />
        </div>
      )}
    </div>
  );
};
