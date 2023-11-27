import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs";

import { db } from "@/lib/db";

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await clerkClient.users.getUser(userId);
    const email = user.emailAddresses[0].emailAddress;

    if (!email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const teacher = await db.teacher.findFirst({
      where: { email: email },
    });
    if (!teacher) {
      const student = await db.student.findFirst({
        where: { email: email },
      });
      if (!student) {
        return NextResponse.json({ role: "BASIC" });
      }
      return NextResponse.json({ role: student.role });
    }

    return NextResponse.json({ role: teacher.role });
  } catch (error) {
    console.log("[CHECK_ROLE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
