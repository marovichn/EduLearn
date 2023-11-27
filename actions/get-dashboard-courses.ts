import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";
import { checkRole } from "./checkRole";
import { Category, Chapter, Course } from "@/prisma/generated/client1";

type CourseWithProgressWithCategory = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
};

export const getDashboardCourses = async (
  userId: string
): Promise<DashboardCourses> => {
  try {
    const purchasedCourses = await db.purchase.findMany({
      where: {
        userId: userId,
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    });

    const role = await checkRole();

    if (role !== "BASIC") {
      //@ts-ignore
      const courses = purchasedCourses.map(
        (purchase) => purchase.course
      ) as CourseWithProgressWithCategory[];

      for (let course of courses) {
        const progress = await getProgress(userId, course.id);
        course["progress"] = progress;
      }

      const completedCourses = courses.filter(
        (course) => course.progress === 100
      );
      const coursesInProgress = courses.filter(
        (course) => (course.progress ?? 0) < 100
      );

      return {
        completedCourses,
        coursesInProgress,
      };
    } else {
      //@ts-ignore
      const coursesAll = purchasedCourses.map(
        (purchase) => purchase.course
      ) as CourseWithProgressWithCategory[];

      const courses = coursesAll.filter(
        (course) => course.eduxclusive !== true
      );

      for (let course of courses) {
        const progress = await getProgress(userId, course.id);
        course["progress"] = progress;
      }

      const completedCourses = courses.filter(
        (course) => course.progress === 100
      );
      const coursesInProgress = courses.filter(
        (course) => (course.progress ?? 0) < 100
      );

      return {
        completedCourses,
        coursesInProgress,
      };
    }
  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]", error);
    return {
      completedCourses: [],
      coursesInProgress: [],
    };
  }
};
