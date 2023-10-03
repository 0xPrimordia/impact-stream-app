import Link from "next/link";
import React from "react";

interface NavbarLinkProps {
  children: React.ReactNode;
  path: string;
  setOverlay: Function;
}
const NavbarLink = ({ children, setOverlay, path }: NavbarLinkProps) => {
  return (
    <Link onClick={() => setOverlay(false)} href={path}>
      {children}
    </Link>
  );
};

export default NavbarLink;
