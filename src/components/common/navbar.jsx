import Link from "next/link";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";

export default function NavBar({ activeTab }) {
  return (
    <Navbar maxWidth="full" className="h-[60px] px-24 shadow-lg" isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">Guider</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem
          className={`${activeTab === "home" && "text-primary"}`}
          isActive={activeTab === "home"}
        >
          <a href="/">Home</a>
        </NavbarItem>

        <NavbarItem
          className={`${activeTab === "tracking" && "text-primary"}`}
          isActive={activeTab === "tracking"}
        >
          <a href="/tracking">Tracking</a>
        </NavbarItem>

        <NavbarItem
          className={`${activeTab === "news" && "text-primary"}`}
          isActive={activeTab === "news"}
        >
          <a href="/news">News</a>
        </NavbarItem>

        <NavbarItem
          className={`${activeTab === "complains" && "text-primary"}`}
          isActive={activeTab === "complains"}
        >
          <a href="/complains">Complains & Inquiries</a>
        </NavbarItem>

        <NavbarItem
          className={`${activeTab === "privacy" && "text-primary"}`}
          isActive={activeTab === "privacy"}
        >
          <a href="/privacy">Privacy</a>
        </NavbarItem>

        <NavbarItem
          className={`${activeTab === "about" && "text-primary"}`}
          isActive={activeTab === "about"}
        >
          <a href="/about">About us</a>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
