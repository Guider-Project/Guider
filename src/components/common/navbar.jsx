import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

export default function NavBar({ active }) {
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Guider</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-8" justify="end">
        <NavbarItem isActive={active === "home"}>
          <Link color={`${active === "home" ? "primary" : "foreground"}`} href="#">
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
    </Navbar>
  );
}