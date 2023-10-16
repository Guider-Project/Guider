import Link from "next/link";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";

export default function NavBar() {
  return (
    <Navbar maxWidth="full" className="h-[60px] px-24 shadow-lg" isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">Guider</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem className="text-primary" isActive>
          <Link href="/">Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/tracking">
            Tracking
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/news">
            News
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/complains">
            Complains & Inquiries
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/about">
            About us
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
