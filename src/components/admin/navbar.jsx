"use client";

import { signOut } from "next-auth/react";
import {
  Input,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";

export default function NavBar({ active }) {
  return (
    <Navbar>
      <NavbarBrand>
        <Link color="foreground" href="/">
          <img
            src="/images/logo.png"
            alt="Guider logo"
            style={{
              height: "60px",
            }}
          />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-8" justify="end">
        <NavbarItem isActive={active === "home"}>
          <Link color={`${active === "home" ? "primary" : "foreground"}`} href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={active === "tracking"}>
          <Link color={`${active === "tracking" ? "primary" : "foreground"}`} href="#">
            Tracking
          </Link>
        </NavbarItem>
        <NavbarItem isActive={active === "news"}>
          <Link color={`${active === "news" ? "primary" : "foreground"}`} href="#">
            News
          </Link>
        </NavbarItem>
        <NavbarItem isActive={active === "complains"}>
          <Link color={`${active === "complains" ? "primary" : "foreground"}`} href="#">
            Complains and Inquiries
          </Link>
        </NavbarItem>
        <NavbarItem isActive={active === "about"}>
          <Link color={`${active === "about" ? "primary" : "foreground"}`} href="#">
            About us
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="end">
        <Button onClick={() => signOut()}>Sign out</Button>
      </NavbarContent>
    </Navbar>
  );
}
