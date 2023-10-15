import { auth, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db, gradedb } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { chapterId } = await req.json();
    if (!chapterId) {
      return new NextResponse("Invalid payload", { status: 400 });
    }
    /*Find student Grade Data*/
    const user = await clerkClient.users.getUser(userId);
    const email = user.emailAddresses[0].emailAddress;
    const student = await gradedb.student.findFirst({
      where: { email: email },
    });

    if (!student) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    /*chapter data*/
    const currentChapter = await db.chapter.findFirst({
      where: {
        id: chapterId,
      },
    });

    if (!currentChapter) {
      return new NextResponse("Invalid payload", { status: 400 });
    }

    /*Creating assignment group*/

    const subjectId = process.env.NEXT_PUBLIC_EDU_CONNECTION_SUBJECT_ID!;
    const date = new Date();

    await gradedb.group.create({
      data: {
        name: currentChapter.title,
        description: "Edulearn Chapter Lesson",
        chapterId: chapterId,
        studentId: student.id,
        subjectId: subjectId,
        assignments: {
          create: [
            {
              type: "EduLesson (self-assigned)",
              points: "10",
              description: currentChapter.title,
              done: false,
              t: "Assignment",
              dateDue: new Date(date.setDate(date.getDate() + 7)),
            },
          ],
        },
      },
    });

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[CHECK_ASSIGNED_GROUP]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
