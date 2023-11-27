import { db } from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs";

export async function checkRole() {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("No signed user!");
    }

    const user = await clerkClient.users.getUser(userId);
    const email = user.emailAddresses[0].emailAddress;

    if (!email) {
      throw new Error("No email found for the user!");
    }

    const teacher = await db.teacher.findFirst({
      where: { email: email },
    });

    if (!teacher) {
      const student = await db.student.findFirst({
        where: { email: email },
      });

      if (!student) {
        return "BASIC";
      }

      return "Student";
    }

    return "Teacher";
  } catch (error) {
    console.error("[CHECK_ROLE_ACTION_ERROR]", error);

    // Handle errors and return an appropriate response
    return "Error"; // Adjust this based on your error handling needs
  } finally {
    // Close the Prisma Client connection
    await db.$disconnect();
  }
}
