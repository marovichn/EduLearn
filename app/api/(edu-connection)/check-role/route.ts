import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const user = await clerkClient.users.getUser(userId);
    const email = user.emailAddresses[0]?.emailAddress;

    if (!email) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const teacher = await db.teacher.findFirst({
      where: { email: email },
    });

    if (!teacher) {
      const student = await db.student.findFirst({
        where: { email: email },
      });
      if (!student) {
        return new NextResponse(JSON.stringify({ role: "BASIC" }), {});
      }
      return new NextResponse(JSON.stringify({ role: student.role }), {});
    }

    return new NextResponse(JSON.stringify({ role: teacher.role }), {});
  } catch (error) {
    console.error("[CHECK_ROLE_ERROR]", error);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
