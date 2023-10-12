import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { gradedb } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId, user } = auth();
    console.log(user);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    /*
    const teacher = await gradedb.teacher.findFirst({
      where: { email: email },
    });
    if (!teacher) {
      const student = await gradedb.student.findFirst({
        where: { email: email },
      });
      if (!student) {
        return NextResponse.json({ role: "BASIC" });
      }
      return NextResponse.json({ role: student.role });
    }

    return NextResponse.json({ role: teacher.role }); */
  } catch (error) {
    console.log("[CHECK_ROLE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
