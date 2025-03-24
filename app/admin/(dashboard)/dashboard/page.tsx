import React from "react";
import { BreadcrumbDemo } from "@/components/index";

const breadcrumbItems = [
  {
    href: "/",
    label: "Home",
  },
  {
    label: "Dashboard",
  },
];

const page = () => {
  return (
    <main className="dashboard-page p-5">
      <h2 className="text-2xl mb-3">Dashboard</h2>
      <BreadcrumbDemo items={breadcrumbItems} />
    </main>
  );
};

export default page;
