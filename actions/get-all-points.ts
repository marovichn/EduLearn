import { db } from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs";

export async function getAllPoints() {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("No signed user!");
    }
    const user = await clerkClient.users.getUser(userId);
    const email = user.emailAddresses[0].emailAddress;
    const student = await db.student.findFirst({
      where: { email: email },
    });
    const studentId = student?.id;
    // Fetch all groups and their assignments
    const groups = await db.group.findMany({
      where: {
        studentId: studentId,
      },
      include: {
        assignments: true,
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
    return totalPoints;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the Prisma Client connection
    await db.$disconnect();
  }
}
