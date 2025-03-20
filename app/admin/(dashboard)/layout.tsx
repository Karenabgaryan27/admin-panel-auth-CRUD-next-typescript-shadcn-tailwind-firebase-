"use client";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { useAuthContext } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NavUser } from "@/components/index";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuthContext();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center justify-between gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <NavUser
              user={{
                name: currentUser?.displayName || "",
                email: currentUser?.email || "",
                avatar: currentUser?.photoURL || "",
              }}
            />
          </div>
        </header>

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
