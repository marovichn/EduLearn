import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { gradedb } from "@/lib/db";

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

    const assignedChapterGroup = await gradedb.group.findFirst({
      where: {
        chapterId: chapterId,
      },
      include:{
        assignments:true
      }
    });

    if (!assignedChapterGroup) {
      return new NextResponse("Invalid request", { status: 400 });
    }

    const chapterAssignmentDone = assignedChapterGroup.assignments[0].done;

    return NextResponse.json(chapterAssignmentDone);
  } catch (error) {
    console.log("[CHECK_ASSIGNED_GROUP]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
