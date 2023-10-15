import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { checkRole } from "@/actions/checkRole";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { title } = await req.json();
    const eduTeacher = (await checkRole()) === "Teacher";

    if (!userId || (!isTeacher(userId) && !eduTeacher)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
