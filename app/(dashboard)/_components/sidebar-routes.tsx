"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";
import { useEffect } from "react";
import axios from "axios";
import { getAcess } from "@/actions/get-access-key";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  useEffect(() => {
    const getData = async () => {
      const [eduConnectionAccessToken1, eduConnectionAccessToken2]: any =
        await getAcess();
      const data = JSON.stringify({
        eduConnectionAccessToken1,
        eduConnectionAccessToken2,
      });
      const registryData = await axios.post(
        "http://localhost:3000/api/edu-registry",
        { data }
      );
      console.log(registryData);
    };
    getData();
  }, []);

  return (
    <div className='flex flex-col w-full'>
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
