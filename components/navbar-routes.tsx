"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { isTeacher } from "@/lib/teacher";

import { SearchInput } from "./search-input";
import { useEffect, useState } from "react";
import axios from "axios";

export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();
  const [role, setRole] = useState("BASIC");

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";
  useEffect(() => {
    axios.get("/api/check-role").then((role: any) => setRole(role.data.role));
  }, []);
  const eduTeacher = role === "Teacher";

  return (
    <>
      {isSearchPage && (
        <div className='hidden md:block'>
          <SearchInput />
        </div>
      )}
      <div className='flex gap-x-2 ml-auto '>
        {isTeacherPage || isCoursePage ? (
          <Link href='/'>
            <Button
              size='sm'
              variant='ghost'
              className='bg-white text-black mr-3 border-[1px] border-black border-dashed'
            >
              <LogOut className='h-4 w-4 mr-2' />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) || eduTeacher ? (
          <Link href='/teacher/courses'>
            <Button
              size='sm'
              variant='ghost'
              className='text-white hover:text-black mr-3 border-[1px] border-white'
            >
              Teacher mode
            </Button>
          </Link>
        ) : null}
        <div className='mt-[2px]'>
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </>
  );
};
