"use client";

import { useSession, signOut } from "next-auth/react";
import { Button, Avatar } from "@nextui-org/react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

export default function NavBar({ activeTab }) {
  const { data: session, status } = useSession();

  return (
    <Navbar maxWidth="full" className="h-[60px] px-24 shadow-lg" isBordered>
      <NavbarBrand>
        <a href="/">
          <p className="flex font-bold items-center text-inherit">
            <img src="/logo/Guider_blue.png" alt="logo" className="h-20 rounded-full" />
            Guider
          </p>
        </a>
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

        {status === "unauthenticated" ? (
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
        ) : status === "authenticated" ? (
          <NavbarItem>
            <div className="flex items-center gap-4">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-370-456322.png"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{session?.data?.email}</p>
                  </DropdownItem>
                  {(session?.data?.role === "owner" || session?.data?.role === "bus") && (
                    <DropdownItem key="settings">
                      <a href="/control-panel" className="w-full">
                        Control Panel
                      </a>
                    </DropdownItem>
                  )}

                  <DropdownItem key="team_settings">Team Settings</DropdownItem>
                  <DropdownItem key="analytics">Analytics</DropdownItem>
                  <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                  <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </NavbarItem>
        ) : null}

        <NavbarItem></NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
