"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Avatar } from "@nextui-org/react";
import { useSession, signOut } from "next-auth/react";

export default function NavBar({ activeTab }) {
  const { status } = useSession();

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

        {status !== "authenticated" ? (
          <>
            <NavbarItem>
              <a href="/signin">
                <Button auto size="small" color="success" className="font-semibold">
                  Sign in
                </Button>
              </a>
            </NavbarItem>

            <NavbarItem>
              <a href="/signup">
                <Button auto size="small" color="success" className="font-semibold">
                  Sign up
                </Button>
              </a>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <div className="flex gap-5">
              <Avatar
                src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-370-456322.png"
                size="small"
                className="cursor-pointer"
              />

              <Button
                auto
                size="small"
                color="success"
                className="font-semibold"
                onClick={() => signOut()}
              >
                Sign out
              </Button>
            </div>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
