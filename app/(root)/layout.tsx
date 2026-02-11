import React from "react";
import Sidebar from "@/components/Sidebar";
import MobileNavigation from "@/components/MobileNavigation";
import Header from "@/components/Header";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { navItems } from "@/constants";

export const dynamic = "force-dynamic";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect("/sign-in");
  console.log(currentUser.status);

  return (
    <main className="flex h-screen">
      <Sidebar {...currentUser} navItems={navItems} />

      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation {...currentUser} navItems={navItems} path="user" />
        <Header userId={currentUser.$id} accountId={currentUser.accountId} status={currentUser.status} />
        <div className="main-content">{children}</div>
      </section>

      <Toaster />
    </main>
  );
};
export default Layout;
