import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db, gradedb } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();
    const email = user?.emailAddresses[0].emailAddress;

    if (!email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const teacher = await gradedb.teacher.findFirst({
      where: { email: email },
    });
    
    
    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const course = await db.course.findUnique({
      where: {
          id: params.courseId,
        isPublished: true,
      },
    });
    
    if (!course) {
        return new NextResponse("Not found", { status: 404 });
    }
   
    if (!teacher) {
      const student = await gradedb.student.findFirst({
        where: { email: email },
      });
      if (!student) {
        return new NextResponse("Unauthorized for EduGrade", { status: 401 });
      }
       await db.purchase.create({
         data: {
           userId: user.id,
           courseId: params.courseId,
         },
       });
    }
     await db.purchase.create({
       data: {
         userId: user.id,
         courseId: params.courseId,
       },
     });
    
    return NextResponse.json("Success", { status: 200 });
  } catch (error) {
      console.log("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
}
}
