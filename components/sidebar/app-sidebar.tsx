"use client";

import React from "react";
import { PanelLeft } from "lucide-react";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import localData from "@/localData";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const { faceImage, houseImage, fileImage, userImage, penImage, gridImage } = localData.svgs;

const data = {
  apps: [
    {
      title: "Home",
      url: "/",
      icon: houseImage,
      isDisabled: false,
    },
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: gridImage,
      isDisabled: false,
    },
    {
      title: "Pages",
      url: "/admin/pages",
      icon: fileImage,
    },
  ],
  settings: [
    {
      title: "Account",
      url: "/admin/account",
      icon: userImage,
    },
    {
      title: "Update Profile",
      url: "/admin/update-profile",
      icon: penImage,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="py-[18px] ">
        <SidebarMenuButton className="hover:bg-transparent">
          {faceImage}
          <h2
            className={`text-gray-600 text-lg font-medium group-data-[collapsible=icon]:hidden whitespace-nowrap duration-200 pointer-events-none`}
          >
            Admin Panel
          </h2>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent className="">
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase text-gray-400 font-normal">App</SidebarGroupLabel>
          <SidebarMenu>
            {data.apps.map((item, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton
                  asChild
                  className={`${
                    // pathname == item.url
                    item.url !== "/" && pathname.startsWith(item.url)
                      ? "bg-primary hover:bg-primary text-white hover:text-white"
                      : ""
                  } rounded-full px-3 py-[18px]`}
                >
                  <Link href={item.url}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="uppercase text-gray-400 font-normal">Settings</SidebarGroupLabel>
          <SidebarMenu>
            {data.settings.map((item, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton
                  asChild
                  className={`${
                    // pathname == item.url
                    item.url !== "/" && pathname.startsWith(item.url)
                      ? "bg-primary hover:bg-primary text-white hover:text-white"
                      : ""
                  } rounded-full px-3 py-[18px]`}
                >
                  <Link href={item.url}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="group-data-[collapsible=icon]:hiddenz">
          <SidebarGroupLabel className="uppercase text-gray-400 font-normal">Projects</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className={`${"pointer-events-none text-gray-400"} px-3 py-[18px]`}>
                <Link href="/">
                  <PanelLeft />
                  <span className="text-custom-sm">Genrix</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-5">
        <h6 className="mb-5 text-xs text-gray-400 group-data-[collapsible=icon]:opacity-0 duration-800 whitespace-nowrap">
          Created by Next.js
        </h6>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
