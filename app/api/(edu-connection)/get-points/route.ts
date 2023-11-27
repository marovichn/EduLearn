import { db } from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

async function handleUnauthorized(): Promise<NextResponse> {
  return new NextResponse("Not Authorized for this action!", { status: 403 });
}

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("No signed user!", { status: 401 });
    }

    const user = await clerkClient.users.getUser(userId);
    const email = user.emailAddresses[0].emailAddress;
    const student = await db.student.findFirst({
      where: { email: email },
    });

    if (!student) {
      return await handleUnauthorized();
    }

    const studentId = student?.id;

    // Fetch all groups and their assignments
    const groups = await db.group.findMany({
      where: { studentId: studentId },
      include: {
        assignments: { where: { done: true } },
      },
    });

    // Initialize a variable to accumulate points
    let totalPoints = 0;

    // Iterate through groups and their assignments
    for (const group of groups) {
      for (const assignment of group.assignments) {
        // Accumulate the points from each assignment
        totalPoints += parseInt(assignment.points, 10) || 0;
      }
    }

    console.log("Total Points:", totalPoints);
    return NextResponse.json(totalPoints);
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    // Close the Prisma Client connection
    await db.$disconnect();
  }
}
