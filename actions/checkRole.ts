import { auth } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs";

import { gradedb } from "@/lib/db";

export const checkRole=async()=> {
  try {
    const { userId } = auth();

    if (!userId) {
      return;
    }

    const user = await clerkClient.users.getUser(userId);
    const email = user.emailAddresses[0].emailAddress;

    if (!email) {
      return;
    }

    const teacher = await gradedb.teacher.findFirst({
      where: { email: email },
    });
    if (!teacher) {
      const student = await gradedb.student.findFirst({
        where: { email: email },
      });
      if (!student) {
        return "BASIC";
      }
      return "Student";
    }

    return "Teacher";
  } catch (error) {
    console.log("[CHECK_ROLE_ACTION_ERROR]", error);
  }
}
