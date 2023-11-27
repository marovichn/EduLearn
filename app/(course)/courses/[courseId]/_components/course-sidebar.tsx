import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress } from "@/prisma/generated/client1";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { CourseProgress } from "@/components/course-progress";

import { CourseSidebarItem } from "./course-sidebar-item";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseSidebar = async ({
  course,
  progressCount,
}: CourseSidebarProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  return (
    <div className='h-full border-r flex flex-col overflow-y-auto shadow-sm'>
      <div className='p-[15px] flex border-b items-start flex-col w-full'>
        <div className='px-[15px] pt-[15px] flex'>
          <Link
            href='/search'
            className='mr-4 flex bg-white text-black  border-[1px] border-black border-dashed rounded-lg hover:bg-gray-100 transition -my-[9.5px] p-2 h-[38px]'
          >
            <ArrowLeft size={14} />
            <Search size={20} />
          </Link>
          <h1 className='font-semibold overflow-hidden'>
            {course.title.slice()}
          </h1>
        </div>
        <div className='w-full'>
          {purchase && (
            <div className='mt-10 px-[15px] pb-[15px]'>
              <CourseProgress variant='success' value={progressCount} />
            </div>
          )}
        </div>
      </div>

      <div className='flex flex-col w-full'>
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};
